"use client";
import { createContext, useState } from "react";

export const PageContext = createContext();

const PageFieldsProvider = ({ children }) => {
  const [fieldValue, setfieldValue] = useState({
    //!! product page fields
    extProductLinks: "",
    price: null,
    priceType: "fixedPrice",
    baseAuctionPrice: null,
    discountedPrice: null, // Optional field
    offerDiscountedPrice: false,
    //!! details page fields
    title: "",
    coverImg: "",
    pageDesc: "",
    contPhone: null,
    contEmail: "",
    //!! setting page fields
    thankYouNote: "",
    redirectionUrl: "",
    metaPixel: "",
    googleAnalytics: "",
    whatsappSupport: null,
    pageExpiry: false,
    pageExpiryDate: null,
    deactivateSales: false,
    //!! Customise page section
    pageOwner: "",
    template: "light",
    color: { hex: "#E9570C" },
  });

  console.log("from PageFieldsProvider", fieldValue);

  return (
    <PageContext.Provider value={{ fieldValue, setfieldValue }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageFieldsProvider;
