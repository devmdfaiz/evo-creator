import {
  TImagesPreview,
  TPageFaqs,
  TPageOrderInputs,
  TPagePolicies,
  TTestimonials,
} from "@/lib/types/index.type";
import { ChangeEvent } from "react";

export interface TPaymentPageFieldData {
  paymentPageData: any;
  setPaymentPageData: (data: any) => void;
}

export interface TErrorHandler {
  isError: string | null;
  setIsError: (error: string) => void;
}

interface PageField {
  type: string;
  placeholder: string;
  required: boolean;
}

export interface TPageFormInputs {
  // Product page fields
  extProductLinks: string;
  categoriesValues: string[];
  category: string;
  price: number | null;
  priceType: string;
  baseAuctionPrice: number | null;
  discountedPrice: number | null;
  offerDiscountedPrice: boolean;
  // Details page fields
  title: string;
  coverImg: string;
  pageDesc: string;
  contPhone: number | null;
  contEmail: string;
  testimonials: TTestimonials[];
  faqs: TPageFaqs[];
  policies: TPagePolicies[];
  // Setting page fields
  pageOrderInputsInitial: PageField;
  pageOrderInputs: TPageOrderInputs[];
  thankYouNote: string;
  redirectionUrl: string;
  metaPixel: string;
  googleAnalytics: string;
  whatsappSupport: number | null;
  pageExpiry: boolean;
  pageExpiryDate: Date | undefined;
  deactivateSales: boolean;
  // Customise page section
  pageOwner: string;
  template: string;
  color: { hex: string };
  // Methods to set the state
  setExtProductLinks: (value: string) => void;
  setCategory: (value: string) => void;
  setPrice: (value: number | null) => void;
  setPriceType: (value: string) => void;
  setBaseAuctionPrice: (value: number | null) => void;
  setDiscountedPrice: (value: number | null) => void;
  setOfferDiscountedPrice: (value: boolean) => void;
  setTitle: (value: string) => void;
  setCoverImg: (value: string) => void;
  setPageDesc: (value: string) => void;
  setContPhone: (value: number | null) => void;
  setContEmail: (value: string) => void;
  setTestimonials: (value: string, props: string, index: number) => void;
  addTestimonials: () => void;
  removeTestimonials: (index: number) => void;
  setFaqs: (value: string, props: string, index: number) => void;
  addFaqs: () => void;
  removeFaqs: (index: number) => void;
  setPolicies: (value: string, props: string, index: number) => void;
  addPolicies: () => void;
  removePolicies: (index: number) => void;
  setPageOrderInputs: (
    value: string | boolean,
    props: "type" | "placeholder" | "required"
  ) => void;
  operationOnPageOrderInputs: (
    index: number,
    operation: "create" | "edit" | "delete"
  ) => void;
  resetPageOrderInputs: () => void;
  refillPageOrderInputs: (index: number) => void;
  setThankYouNote: (value: string) => void;
  setRedirectionUrl: (value: string) => void;
  setMetaPixel: (value: string) => void;
  setGoogleAnalytics: (value: string) => void;
  setWhatsappSupport: (value: number | null) => void;
  setPageExpiry: (value: boolean) => void;
  setPageExpiryDate: (value: Date | undefined) => void;
  setDeactivateSales: (value: boolean) => void;
  setPageOwner: (value: string) => void;
  setTemplate: (value: string) => void;
  setColor: (value: string) => void;
}
