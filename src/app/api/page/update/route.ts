import connectToDb from "@/lib/mongodb/connection/db";
import { Page } from "@/lib/mongodb/models/page.model";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  connectToDb();

  const { values, testimonialsFields, faqs, policies, fieldDetails, pageId } =
    await req.json();

    

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
      { _id: pageId },
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

    if (!pageDetail)
      return NextResponse.json({
        massage: "Page not found!",
        error: null,
        status: false,
      });

    return NextResponse.json({
      massage: "Page details are updated",
      error: null,
      status: true,
    });
  } catch (error) {
    console.log("page update error", error);
    return NextResponse.json({
      massage: "Something went wrong. Please try again.",
      error,
      status: false,
    });
  }
}
