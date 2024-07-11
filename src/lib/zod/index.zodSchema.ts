import { z } from "zod";
import { toast } from "sonner";

export const showToast = (
  title: string | null,
  desc: string | null,
  label: string | null,
  onClick: () => void | any
) => {
  toast(title, {
    description: desc,
    action: {
      label: label,
      onClick: onClick,
    },
  });
};

export const pageFieldSchema = z.object({
  type: z.string({
    required_error: "Please select an field type.",
  }),
  placeholder: z
    .string({
      required_error: "Please select an field type.",
    })
    .trim(),
  required: z.boolean().optional(),
});

export const pageFormSchema = z
  .object({
    //!! product page fields
    extProductLinks: z
      .string({
        required_error: "External link is required",
      })
      .trim()
      .optional(),
    category: z.string().toLowerCase(),
    price: z.coerce
      .number({
        required_error: "Price is required",
      })
      .nullable()
      .optional(),
    priceType: z.enum(["fixedPrice", "auctionPrice"]),
    baseAuctionPrice: z.coerce
      .number({
        required_error: "Base Price is required",
      })
      .nullable()
      .optional(),
    // Add the discounted price field conditionally
    discountedPrice: z.coerce.number().nullable().optional(), // Optional field
    offerDiscountedPrice: z.boolean(), // Checkbox value (true or false)
    //!! details page fields
    title: z.string({ required_error: "Title is required" }).trim(),
    coverImg: z
      .string({ required_error: "Cover image is required" })
      .trim()
      .optional(),
    pageDesc: z.string({ required_error: "Description is required" }).trim(),
    contPhone: z.coerce
      .number({ required_error: "Contact phone is required" })
      .nullable(),
    contEmail: z
      .string({ required_error: "Contact email is required" })
      .email()
      .trim(),
    //!! setting page fields
    pageField: pageFieldSchema,
    thankYouNote: z.string().trim().optional(),
    redirectionUrl: z.string().trim().optional(),
    metaPixel: z.string().trim().optional(),
    googleAnalytics: z.string().trim().optional(),
    whatsappSupport: z.coerce
      .number({
        required_error: "Whatsapp contact phone is required",
      })
      .nullable(),
    pageExpiry: z.boolean(),
    pageExpiryDate: z.coerce.date().nullable().optional(),
    deactivateSales: z.boolean(),
    //!! Customise page section
    pageOwner: z
      .string({
        required_error: "Whatsapp contact phone is required",
      })
      .trim(),
    template: z.enum(["dark", "light"]),
    color: z.object({ hex: z.string() }),
  })
  .refine((data) => {
    // Custom validation logic
    if (data.offerDiscountedPrice && !data.discountedPrice) {
      showToast(
        "Discounted price is required when offering a discount",
        "Go to product section and enter discounted price",
        "Close",
        () => {}
      );
    }
    if (data.pageExpiry && !data.pageExpiryDate) {
      showToast(
        "Expiry date is required when enabling page expiry",
        "Go to setting section and enter page expiry date",
        "Close",
        () => {}
      );
    }
    if (data.priceType === "fixedPrice" && !data.price) {
      showToast(
        "Price is required",
        "Go to product section and enter page price",
        "Close",
        () => {}
      );
    }
    if (data.priceType === "auctionPrice" && !data.baseAuctionPrice) {
      showToast(
        "Base price is required",
        "Go to product section and enter page base price",
        "Close",
        () => {}
      );
    }
    if (data.price && data.discountedPrice) {
      if (
        data.price < data.discountedPrice ||
        data.price === data.discountedPrice
      ) {
        showToast(
          "Discounted price must be less then regular price",
          "Go to product section and correct your price",
          "Close",
          () => {}
        );
      }
    }
    if (!data.title) {
      showToast(
        "Title is required",
        "Go to details section and enter page title",
        "Close",
        () => {}
      );
    }
    if (!data.pageDesc) {
      showToast(
        "Description is required",
        "Go to details section and enter page description",
        "Close",
        () => {}
      );
    }
    if (!data.contPhone) {
      showToast(
        "Phone number is required",
        "Go to details section and enter page phone number",
        "Close",
        () => {}
      );
    }
    if (!data.contEmail) {
      showToast(
        "Email is required",
        "Go to details section and enter page email",
        "Close",
        () => {}
      );
    }
    if (!data.whatsappSupport) {
      showToast(
        "Whatsapp support number is required",
        "Go to settings section and enter whatsapp support number",
        "Close",
        () => {}
      );
    }
    if (!data.pageOwner) {
      showToast(
        "Page owner is required",
        "Go to customise section and enter Page owner",
        "Close",
        () => {}
      );
    }
    if (!data.category) {
      showToast(
        "Please select category",
        "Go to price section and select category",
        "Close",
        () => {}
      );
    }
    return true; // Validation passed
  });

/**
 * This Zod schema for sign up form
 */
export const formSchemaSignUp = z.object({
  fullname: z.string().min(3, {
    message: "Full Name must be at least 3 characters.",
  }),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digit",
    })
    .max(10, {
      message: "Phone number must be contain 10 digit",
    }),

  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(16, {
      message: "Password max contain 16 characters",
    }),
});

//!! ZOD schema for page meta data
export const pageShortFormSchema = z.object({
  metaTitle: z
    .string()
    .min(6, "Short title must contain at least 6 character(s)")
    .max(60, "Short title must contain at most 60 character(s)"),
  metaDesc: z
    .string()
    .min(70, "Short description must contain at least 70 character(s)")
    .max(160, "Short description must contain at most 160 character(s)"),
  keywords: z
    .string()
    .min(10, "Keywords must contain at least 10 character(s)"),
  // subdomain: z
  //   .string()
  //   .min(4, "Subdomain must contain at least 4 character(s)")
  //   .max(20, "Subdomain must contain at most 20 character(s)"),
  // pageType: z.enum(["simple-page", "with-page-builder"], {
  //   required_error: "You need to select a notification type.",
  // }),
});

/**
 * This zod schema for sign in form
 */
export const formSchemaLogin = z.object({
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digit",
    })
    .trim()
    .max(10, {
      message: "Phone number must be contain 10 digit",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(16, {
      message: "Password max contain 16 characters",
    })
    .trim(),
});

/**
 * This zod schema for forgot password phone input
 */
export const formSchemaForgotPassword = z.object({
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digit",
    })
    .trim()
    .max(10, {
      message: "Phone number must be contain 10 digit",
    }),
});

export const bankFormSchema = z.object({
  businessName: z
    .string({ required_error: "Business Name is required" })
    .min(4, {
      message: "Business Name must be at least 4 characters.",
    })
    .max(200, {
      message: "Maximum length of business name is 200 characters.",
    })
    .trim(),
  businessType: z
    .string({ required_error: "Business Type is required" })
    .trim(),
  businessCategory: z
    .string({ required_error: "Business Category is required" })
    .trim(),
  subBusinessCategory: z
    .string({ required_error: "Sub-Business Category is required" })
    .trim(),
  accountNumber: z
    .string({ required_error: "Bank account number is required" })
    .trim(),
  ifscCode: z.string({ required_error: "IFSC code is required" }).trim(),
  beneficiaryName: z
    .string({ required_error: "Beneficiary Name is required" })
    .trim(),
  pan: z.string({ required_error: "Pan number is required" }).trim(),
  addressLine: z.string({ required_error: "Address line is required" }).trim(),
  city: z.string({ required_error: "City is required" }).trim(),
  state: z.string({ required_error: "State is required" }).trim(),
  pinCode: z.string({ required_error: "Pin code is required" }).trim(),
  country: z.string({ required_error: "Country is required" }).trim(),
});