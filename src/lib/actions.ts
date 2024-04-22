"use server";
import { z } from "zod";
import connectToDb from "./mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import { Order } from "@/lib/mongodb/models/order.model";
import bcrypt from "bcryptjs";
import { Page } from "./mongodb/models/page.model";
import { formSchemaSignUp, pageFormSchema } from "./zod/index.zodSchema";

/**
 * For saving users in mongodb database
 */
export const saveUsersToDb = async (value: z.infer<typeof formSchemaSignUp>) => {
  connectToDb();

  const { fullname, email, password, phone } = value;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      fullname,
      phone,
      email,
      password: hashPassword,
    });

    // Payload for next auth JWT token
    const payload = {
      id: user._id,
      fullname: user.fullname,
      phone: user.phone,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      userRole: user.userRole,
      avatar: user.avatar,
    };

    return { massage: "User created successfully", status: true, payload };
  } catch (error) {
    console.log("There is problem in creating user in db =>", error);

    return {
      massage: "Something went wrong. Please try again ",
      status: false,
    };
  }
};

/**
 * For validating users credentials
 */

export const checkCredentials = async (phone: string, password: string) => {
  connectToDb();

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return {
        massage: "User dose not exist. Please first create an account",
        status: false,
        redirectTo: "/sign-up",
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return {
        massage: "Please enter correct password",
        status: false,
      };
    }

    // Payload for next auth JWT token
    const payload = {
      id: user._id,
      fullname: user.fullname,
      phone: user.phone,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      //TODO: isPhoneVerified letter
      // isPhoneVerified: user.isPhoneVerified,
      userRole: user.userRole,
      avatar: user.avatar,
    };

    return {
      massage: "User verified",
      status: true,
      payload: payload,
    };
  } catch (error) {
    console.log("There is problem in login =>", error);
    return { massage: error, status: false };
  }
};

/**
 * Use this server action for creating new page
 */
export const createPage = async (values: any) => {
  connectToDb();

  const { metaTitle, metaDesc, keywords, pageType, subdomain, user } = values;

  const { sub } = user;

  try {
    const res = await Page.create({
      metaData: { metaTitle, metaDesc, keywords },
      subdomain,
      creator: sub,
    });

    const payload = { id: res._id, pageType: res.pageType };

    return {
      massage: "Page created",
      status: true,
      payload: payload,
    };
  } catch (error) {
    console.log("There is problem in creating page =>", error);
    return { massage: "There is problem in creating page", status: false };
  }
};

/**
 * Check subdomain is aval
 */
export const checkSubdoamin = async (subdomain: string) => {
  connectToDb();

  try {
    const res = await Page.findOne({ subdomain });

    if (res) {
      return {
        status: false,
        massage: "Subdomain is alrady exist. Please try other one",
      };
    }

    return { status: true, massage: "Subdomain is available" };
  } catch (error) {
    console.log("There is problem in checkSubdoamin =>", error);
    return { massage: error, status: false };
  }
};

export const handleNextSave = (formData: any) => {
  // e.preventDefault();

  const data = Object.fromEntries(formData);

  console.log(data);
};

/**
 * This function is for updating page detail from page creation section
 * @param values
 * @param testimonialsFields
 * @param faqs
 * @param policies
 * @param fieldDetails
 * @param id
 * @returns
 */

export const actionPageDetailUpdate = async (
  values: z.infer<typeof pageFormSchema>,
  testimonialsFields: any,
  faqs: any,
  policies: any,
  fieldDetails: any,
  id: any
) => {
  connectToDb();

  const pageContent = {
    contEmail: values.contEmail,
    contPhone: values.contPhone,
    coverImg: values.coverImg,
    pageDesc: values.pageDesc,
    title: values.title,
    testimonialsFields,
    faqs,
    policies,
  };

  const priceDetail = {
    offerDiscountedPrice: values.offerDiscountedPrice,
    price: values.price,
    discountedPrice: values.discountedPrice,
    priceType: values.priceType,
    baseAuctionPrice: values.baseAuctionPrice,
    category: values.category,
  };

  const settings = {
    formInputs: fieldDetails,
    thankYouNote: values.thankYouNote,
    redirectionUrl: values.redirectionUrl,
    metaPixel: values.metaPixel,
    googleAnalytics: values.googleAnalytics,
    whatsappSupport: values.whatsappSupport,
    pageExpiry: values.pageExpiry,
    pageExpiryDate: values.pageExpiryDate,
    deactivateSales: values.deactivateSales,
  };

  const theme = {
    pageOwner: values.pageOwner,
    template: values.template,
    color: values.color.hex,
  };

  const productLink = values.extProductLinks;

  try {
    const pageDetail = await Page.findOneAndUpdate(
      { _id: id },
      {
        pageContent,

        pagePrice: priceDetail,

        settings: {
          formInputs: settings.formInputs,
          redirectUrl: settings.redirectionUrl,
          analyticIds: {
            metaPixel: settings.metaPixel,
            googleAnalytics: settings.googleAnalytics,
          },
          downloadableFile: productLink,
          thankYouNote: settings.thankYouNote,
          whatsappSupport: settings.whatsappSupport,
          pageExpiry: settings.pageExpiry,
          pageExpiryDate: settings.pageExpiryDate,
          deactivateSales: settings.deactivateSales,
        },
        theme: {
          name: theme.pageOwner,
          template: theme.template,
          color: theme.color,
        },
      }
    );

    if (!pageDetail) return null;

    return true;
  } catch (error) {
    console.log("res page", error);
  }
};

/**
 * Function (server action) that takes customer info which is collected form payment page via handleOrderFilledInfo(). Roll of this function takes customer info and save to database
 * @param
 */
export const actionOrderFilledInfo = async (
  data: any,
  pageId: string,
  device: string,
  priceType: string
) => {
  connectToDb();

  try {
    const pageDetail = await Page.findById(pageId);

    const amount = pageDetail?.pagePrice?.price;
    let createdOrder;

    const auctionPrice = data?.auctionPrice;

    if (pageDetail) {
      createdOrder = await Order.create({
        customerInfo: data,
        ofPage: [pageId],
        amount: priceType === "auctionPrice" ? auctionPrice : amount,
        device,
      });
    }

    if (createdOrder) {
      pageDetail.pageOrders.push(createdOrder._id);
      await pageDetail.save();
    }

    return { msg: "Order created", status: 200 };
  } catch (error) {
    console.log("error in creating order =>", error);
    return { msg: "Some went wrong", status: 500 };
  }
};

export const checkOrderPaidOrNot = async (orderId: string) => {
  connectToDb();
  try {
    const { rzrPayStatus, isPaid } = await Order.findOne({
      rzrPayOrderId: orderId,
    });

    return { rzrPayStatus, isPaid, status: true };
  } catch (error) {
    return { rzrPayStatus: null, isPaid: false, status: false };
  }
};
