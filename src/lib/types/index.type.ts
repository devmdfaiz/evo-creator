import { ReactNode } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface TFieldDetails {
  placeholder: string;
  required: boolean;
  type: string;
}

export interface Navlinks {
  title: string;
  slug: string;
  icon: ReactNode;
}

export interface TPageTestimonialsFields {
  testiName: string;
  testiMsg: string;
}

export interface TPageFaqs {
  question: string;
  answer: string;
}

export interface TPagePolicies {
  title: string;
  content: string;
}

export interface TDetailsFields {
  form: any;
  testimonialsFields: TPageTestimonialsFields[];
  setTestimonialsFieds: (prev: any) => void | any;
  faqs: TPageFaqs[];
  setFaqs: (prev: any) => void | any;
  policies: TPagePolicies[];
  setPolicies: (prev: any) => void | any;
  formValues: any;
}

export interface TSettingFields {
  form: any;
  fieldDetails: TFieldDetails[];
  setFieldDetails: (prev: any) => void | any;
  formValues: any;
}

export interface TFieldAddEditDialog {
  form: any;
  action: string;
  setFieldDetails: (prev: any) => void | any;
  children: ReactNode;
  actionType: string;
  index: number;
  formValues: any;
}

export interface TPagePrice {
  offerDiscountedPrice: boolean;
  price: number;
  discountedPrice: number;
  priceType: string;
  baseAuctionPrice: string;
}

export interface TProductPageForm {
  fieldsData: TFieldDetails[];
  priceDetails: TPagePrice;
  color: string;
  theme: string;
  className?: string;
}

export interface TPageInputs {
  fieldsData: TFieldDetails[];
  color: string;
  theme: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export interface TProductPageFormMobile {
  priceDetails: TPagePrice;
  color: string;
  theme: string;
  className?: string;
  action?: string
}

export interface TPriceBreakdownAuction {
  priceDetails: TPagePrice;
  theme: string;
  color: string;
  action?: string
}

export interface TPriceBreakdownFixed {
  priceDetails: TPagePrice;
  theme: string;
}
