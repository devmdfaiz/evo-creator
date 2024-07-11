import { ReactNode } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface TPageOrderInputs {
  placeholder: string;
  required: boolean;
  type: string;
}

export interface Navlinks {
  title: string;
  slug: string;
  icon: ReactNode;
}

export interface TTestimonials {
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
}

export interface TSettingFields {
  form: any;
}

export interface TFieldAddEditDialog {
  form: any;
  action: string;
  children: ReactNode;
  actionType: "create" | "edit";
  index: number;
}

export interface TPagePrice {
  offerDiscountedPrice: boolean;
  price: number | null;
  discountedPrice: number | null;
  priceType: string | undefined;
  baseAuctionPrice: number | null;
}

export interface TProductPageForm {
  fieldsData: TPageOrderInputs[];
  priceDetails: TPagePrice;
  color: string;
  theme: string;
  className?: string;
}

export interface TPageInputs {
  fieldsData: TPageOrderInputs[];
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
  action?: string;
}

export interface TPriceBreakdownAuction {
  priceDetails: TPagePrice;
  theme: string;
  color: string;
  action?: string;
}

export interface TPriceBreakdownFixed {
  priceDetails: TPagePrice;
  theme: string;
}

export interface TImagesPreview {
  url: string;
  file: File;
}

interface FileData {
  localUrl: string;
  fileName: string;
  uploadedFileId?: string;
  uploadedFileUrl?: string;
  selectedFile: File;
}

export type TStatus =
  | "uploaded"
  | "un-uploaded"
  | "uploading"
  | "failed"
  | "success"
  | "deleting"
  | "deleted";

export interface Item {
  status: TStatus;
  fileData: FileData;
}

export interface TNImagesPreview {
  product: Item[];
  details: Item[];
  customise: Item[];
}

export interface TValidFiles {
  formates: string[];
  size: number;
}

export type TTabsFrom = "product" | "details" | "customise";
