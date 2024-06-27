import { TPageFormInputs } from "./store.types";

export const pageFormInitialInputs: Omit<TPageFormInputs, keyof any> = {
    extProductLinks: "",
    category: "",
    price: null,
    priceType: "fixedPrice",
    baseAuctionPrice: null,
    discountedPrice: null,
    offerDiscountedPrice: false,
    title: "",
    coverImg: "",
    pageDesc: "",
    contPhone: null,
    contEmail: "",
    pageField: {
      fieldType: "",
      placeholder: "",
      isRequired: false,
    },
    thankYouNote: "",
    redirectionUrl: "",
    metaPixel: "",
    googleAnalytics: "",
    whatsappSupport: null,
    pageExpiry: false,
    pageExpiryDate: null,
    deactivateSales: false,
    pageOwner: "",
    template: "light",
    color: { hex: "#E9570C" },
  };
  