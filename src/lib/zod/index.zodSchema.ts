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
  fieldType: z.string({
    required_error: "Please select an field type.",
  }),
  placeholder: z
    .string({
      required_error: "Please select an field type.",
    })
    .trim(),
  isRequired: z.boolean().optional(),
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

export const formValuesFun = (
  form: any,
  faqs: any,
  policies: any,
  testimonialsFields: any,
  fieldDetails: any
) => {
  return {
    //!! product page fields
    extProductLinks: form.watch("extProductLinks"),
    price: form.watch("price"),
    priceType: form.watch("priceType"),
    baseAuctionPrice: form.watch("baseAuctionPrice"),
    discountedPrice: form.watch("discountedPrice"),
    offerDiscountedPrice: form.watch("offerDiscountedPrice"),
    //!! details page fields
    title: form.watch("title"),
    coverImg: form.watch("coverImg"),
    pageDesc: form.watch("pageDesc"),
    contPhone: form.watch("contPhone"),
    contEmail: form.watch("contEmail"),
    faqs,
    policies,
    testimonialsFields,
    //!! setting page fields
    fieldDetails,
    thankYouNote: form.watch("thankYouNote"),
    redirectionUrl: form.watch("redirectionUrl"),
    metaPixel: form.watch("metaPixel"),
    googleAnalytics: form.watch("googleAnalytics"),
    whatsappSupport: form.watch("whatsappSupport"),
    pageExpiry: form.watch("pageExpiry"),
    pageExpiryDate: form.watch("pageExpiryDate"),
    deactivateSales: form.watch("deactivateSales"),
    //!! Customise page section
    pageOwner: form.watch("pageOwner"),
    template: form.watch("template"),
    color: form.watch("color"),
  };
};

export const formValuesArrFun = (form: any) => {
  return [
    form.watch("extProductLinks"),
    form.watch("price"),
    form.watch("priceType"),
    form.watch("baseAuctionPrice"),
    form.watch("discountedPrice"),
    form.watch("offerDiscountedPrice"),
    form.watch("title"),
    form.watch("coverImg"),
    form.watch("pageDesc"),
    form.watch("contPhone"),
    form.watch("contEmail"),
    form.watch("thankYouNote"),
    form.watch("redirectionUrl"),
    form.watch("metaPixel"),
    form.watch("googleAnalytics"),
    form.watch("whatsappSupport"),
    form.watch("pageExpiry"),
    form.watch("pageExpiryDate"),
    form.watch("deactivateSales"),
    form.watch("pageOwner"),
    form.watch("template"),
    form.watch("color"),
  ];
};
