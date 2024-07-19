import { type ClassValue, clsx } from "clsx";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import QRCode from "qrcode";
import axios from "axios";
import { TFileHandler, TPageFormInputs } from "@/context/zustand/store.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const aggregateAmountsByDate = (orders: any[]) => {
  const amountsByDate: { [key: string]: number } = {};

  orders.forEach((order) => {
    if (order.isPaid) {
      const date = order.createdAt.split("T")[0];
      if (!amountsByDate[date]) {
        amountsByDate[date] = 0;
      }
      amountsByDate[date] += order.amount;
    }
  });

  return Object.keys(amountsByDate).map((date) => ({
    Amount: amountsByDate[date],
    date: date,
  }));
};

export function dashboardGrowthCalculation({
  currentPeriod,
  comparisonPeriod,
}: {
  currentPeriod: any[];
  comparisonPeriod: any[];
}) {
  //Current calculation
  let currentTotalRevenue = 0;

  const currentFilteredOrders = currentPeriod?.filter((data) => {
    return data?.isPaid === true;
  });

  for (const filteredOrder of currentFilteredOrders) {
    currentTotalRevenue += parseFloat(filteredOrder?.amount);
  }

  const currentOrderCount = currentPeriod?.length;

  // Comparison calculation
  let comparisonTotalRevenue = 0;

  const comparisonFilteredOrders = comparisonPeriod?.filter((data) => {
    return data?.isPaid === true;
  });

  for (const filteredOrder of comparisonFilteredOrders) {
    comparisonTotalRevenue += parseFloat(filteredOrder?.amount);
  }
  const comparisonOrderCount = comparisonPeriod?.length;

  const currentRevenueTotalCount = currentTotalRevenue;
  const comparisonRevenueTotalCount = comparisonTotalRevenue;

  // % calculations
  const revenueGrowth =
    comparisonOrderCount === 0
      ? 0 // Avoid division by zero
      : ((currentRevenueTotalCount - comparisonRevenueTotalCount) /
          comparisonRevenueTotalCount) *
        100;

  const orderGrowth =
    comparisonOrderCount === 0
      ? 0 // Avoid division by zero
      : ((currentOrderCount - comparisonOrderCount) / comparisonOrderCount) *
        100;

  const succOrderGrowth =
    currentFilteredOrders.length === 0
      ? 0 // Avoid division by zero
      : ((currentFilteredOrders?.length - comparisonFilteredOrders?.length) /
          comparisonFilteredOrders?.length) *
        100;

  const faildOrderGrowth =
    currentFilteredOrders.length === 0
      ? 0 // Avoid division by zero
      : ((currentPeriod.length -
          currentFilteredOrders.length -
          (comparisonPeriod?.length - comparisonFilteredOrders?.length)) /
          (comparisonPeriod?.length - comparisonFilteredOrders?.length)) *
        100;

  return {
    orderGrowth,
    currentTotalRevenue,
    revenueGrowth,
    currentFilteredOrders,
    succOrderGrowth,
    faildOrderGrowth,
  };
}

export const getUniquePageIds = (
  currentPeriodOrder: any[],
  comparisonPeriodOrder: any[]
): any[] => {
  const currentPeriodOrderMap = currentPeriodOrder.map((order) => order.pageId);
  const currentPeriodOrderPageId = Array.from(new Set(currentPeriodOrderMap));

  const comparisonPeriodOrderMap = comparisonPeriodOrder.map(
    (order) => order.pageId
  );
  const comparisonPeriodOrderPageId = Array.from(
    new Set(comparisonPeriodOrderMap)
  );

  return [comparisonPeriodOrderPageId, currentPeriodOrderPageId];
};

export const generateQR = (
  text: string,
  setQrCodeUrl: Dispatch<SetStateAction<string>>
) => {
  QRCode.toDataURL(text, { version: 7 })
    .then((url: string) => {
      setQrCodeUrl(url);
    })
    .catch((err: any) => {
      console.error(err);
    });
};

export const downloadImage = (dataUrl: string, filename: string) => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const redirectToLink = (
  url: string,
  target: "_blank" | "_parent" | "_self" | "_top"
) => {
  const { fullHash } = hashUrlExtractor();

  const link = document.createElement("a");
  link.href = `${url}${fullHash}`;
  link.target = target;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function hashUrlExtractor(): {
  fullHash: string;
  hashValue: string;
  fileHandlerStorage: string | null;
  pageInputsStorage: string | null;
} {
  // Get the full hash value from the URL
  const fullHash = window.location.hash;

  // Remove the leading '#' character
  const hashValue = fullHash.substring(1);

  // Create a URLSearchParams object to parse the hash value
  const params = new URLSearchParams(hashValue);

  // Extract specific parameters
  const fileHandlerStorage = params.get("file-handler-storage");
  const pageInputsStorage = params.get("page-inputs-storage");

  return { fullHash, hashValue, fileHandlerStorage, pageInputsStorage };
}

export function formatePageInputs(
  values: TPageFormInputs,
  files: TFileHandler
) {
  const { fullHash } = hashUrlExtractor();

  const pageContent = {
    contEmail: values.contEmail,
    contPhone: values.contPhone,
    pageDesc: values.pageDesc,
    title: values.title,
    testimonialsFields: values.testimonials,
    faqs: values.faqs,
    policies: values.policies,
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
    formInputs: values.pageOrderInputs,
    thankYouNote: values.thankYouNote,
    buttonText: values.buttonText,
    metaPixel: values.metaPixel,
    googleAnalytics: values.googleAnalytics,
    // whatsappSupport: values.whatsappSupport,
    pageExpiry: values.pageExpiry,
    pageExpiryDate: values.pageExpiryDate,
    deactivateSales: values.deactivateSales,
  };

  const theme = {
    pageOwner: values.pageOwner,
    template: values.template,
    color: values.color.hex,
  };

  const fieldsInput = {
    pageContent,
    files: files.imagesPreview,
    publishStatus: "public",
    pageHashUrl: fullHash,
    pagePrice: priceDetail,
    settings: {
      formInputs: settings.formInputs,
      buttonText: settings.buttonText,
      analyticIds: {
        metaPixel: settings.metaPixel,
        googleAnalytics: settings.googleAnalytics,
      },
      thankYouNote: settings.thankYouNote,
      // whatsappSupport: settings.whatsappSupport,
      pageExpiry: settings.pageExpiry,
      pageExpiryDate: settings.pageExpiryDate,
      deactivateSales: settings.deactivateSales,
    },
    theme,
    downloadableFile: values.extProductLinks,
  };

  return fieldsInput;
}