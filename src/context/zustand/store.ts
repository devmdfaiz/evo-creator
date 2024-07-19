import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { urlHashStorage } from "./urlHashStorage";
import {
  TErrorHandler,
  TFileHandler,
  TPageFormInputs,
  TPageSeo,
  TPaymentPageFieldData,
} from "./store.types";
import { CATEGORIES_DATA } from "@/lib/constants/index.constant";
import { showToast } from "@/lib/zod/index.zodSchema";

// Stores for Payment page
export const usePaymentPageFieldData = create<TPaymentPageFieldData>((set) => ({
  paymentPageData: null,
  setPaymentPageData: (data) => set((state) => ({ paymentPageData: data })),
}));

// Error handler store
export const useErrorHandler = create<TErrorHandler>((set) => ({
  isError: null,
  setIsError: (error) => set((state) => ({ isError: error })),
}));

// Page tab fields

const pageOrderInputsInitialValue = {
  type: "",
  placeholder: "",
  required: false,
};

export const usePageFormInputs = create(
  persist<TPageFormInputs>(
    (set) => ({
      extProductLinks: "",
      categoriesValues: CATEGORIES_DATA,
      category: "",
      price: null,
      priceType: "fixedPrice",
      baseAuctionPrice: null,
      discountedPrice: null,
      offerDiscountedPrice: false,
      title: "",
      // files: "",
      pageDesc: "",
      contPhone: null,
      contEmail: "",
      testimonials: [],
      faqs: [],
      policies: [],
      pageOrderInputsInitial: pageOrderInputsInitialValue,
      pageOrderInputs: [
        { type: "text-text", placeholder: "Full Name", required: true },
        { type: "number-phone", placeholder: "Phone Number", required: true },
        { type: "email-email", placeholder: "Email", required: true },
      ],
      thankYouNote: "",
      buttonText: "Buy Now",
      metaPixel: "",
      googleAnalytics: "",
      // whatsappSupport: null,
      pageExpiry: false,
      pageExpiryDate: undefined,
      deactivateSales: false,
      pageOwner: "",
      template: "light",
      color: { hex: "#E9570C" },
      // Actions
      setExtProductLinks: (extProductLinks) => set(() => ({ extProductLinks })),
      setCategory: (category) => set(() => ({ category })),
      setPrice: (price) => set(() => ({ price })),
      setPriceType: (priceType) => set(() => ({ priceType })),
      setBaseAuctionPrice: (baseAuctionPrice) =>
        set(() => ({ baseAuctionPrice })),
      setDiscountedPrice: (discountedPrice) => set(() => ({ discountedPrice })),
      setOfferDiscountedPrice: (offerDiscountedPrice) =>
        set(() => ({ offerDiscountedPrice })),
      setTitle: (title) => set(() => ({ title })),
      // setFiles: (files) => set(() => ({ files })),
      setPageDesc: (pageDesc) => set(() => ({ pageDesc })),
      setContPhone: (contPhone) => set(() => ({ contPhone })),
      setContEmail: (contEmail) => set(() => ({ contEmail })),
      setTestimonials: (value, props, index) => {
        set((state) => {
          const newTestimonials = [...state.testimonials];
          newTestimonials[index] = {
            ...newTestimonials[index],
            [props]: value,
          };

          return { testimonials: newTestimonials };
        });
      },
      addTestimonials: () => {
        set((state) => {
          const addedTestimonial = [
            ...state.testimonials,
            { testiName: "", testiMsg: "" },
          ];

          return { testimonials: addedTestimonial };
        });
      },
      removeTestimonials: (index) => {
        set((state) => {
          const prev = state.testimonials;
          const filteredTestimonials = prev.filter((_, i) => index !== i);
          return { testimonials: filteredTestimonials };
        });
      },
      setFaqs: (value, props, index) => {
        set((state) => {
          const newFaqs = [...state.faqs];
          newFaqs[index] = {
            ...newFaqs[index],
            [props]: value,
          };

          return { faqs: newFaqs };
        });
      },
      addFaqs: () => {
        set((state) => {
          const addedFaq = [...state.faqs, { question: "", answer: "" }];

          return { faqs: addedFaq };
        });
      },
      removeFaqs: (index) => {
        set((state) => {
          const prev = state.faqs;
          const filteredFaqs = prev.filter((_, i) => i !== index);

          return { faqs: filteredFaqs };
        });
      },
      setPolicies: (value, props, index) => {
        set((state) => {
          const newPolicies = [...state.policies];
          newPolicies[index] = {
            ...newPolicies[index],
            [props]: value,
          };

          return { policies: newPolicies };
        });
      },
      addPolicies: () => {
        set((state) => {
          const addedPolicies = [...state.policies, { title: "", content: "" }];

          return { policies: addedPolicies };
        });
      },
      removePolicies: (index) => {
        set((state) => {
          const prev = state.policies;
          const filteredPolicies = prev.filter((_, i) => i !== index);

          return { policies: filteredPolicies };
        });
      },
      setPageOrderInputs: (value, props) => {
        set((state) => {
          return {
            pageOrderInputsInitial: {
              ...state.pageOrderInputsInitial,
              [props]: value,
            },
          };
        });
      },
      operationOnPageOrderInputs: (index, operation) => {
        set((state) => {
          if (operation === "create" && index) {
            return {
              pageOrderInputs: [
                ...state.pageOrderInputs,
                state.pageOrderInputsInitial,
              ],
            };
          }

          if (operation === "edit" && index) {
            const newValues = state.pageOrderInputs;

            newValues[index] = state.pageOrderInputsInitial;

            return { pageOrderInputs: newValues };
          }

          // if operation === "delete"
          const filteredPageOrderInputs = state.pageOrderInputs.filter(
            (_, i) => i !== index
          );

          return { pageOrderInputs: filteredPageOrderInputs };
        });
      },
      resetPageOrderInputs: () => {
        set((state) => {
          return {
            pageOrderInputsInitial: pageOrderInputsInitialValue,
          };
        });
      },
      refillPageOrderInputs: (index) => {
        set((state) => {
          //!! Getting avil value and setting in field add dialog input
          const newInitialValue = {
            type: state.pageOrderInputs[index].type,
            placeholder: state.pageOrderInputs[index].placeholder,
            required: state.pageOrderInputs[index].required,
          };
          return { pageOrderInputsInitial: newInitialValue };
        });
      },
      setThankYouNote: (thankYouNote) => set(() => ({ thankYouNote })),
      setButtonText: (buttonText) => set(() => ({ buttonText })),
      setMetaPixel: (metaPixel) => set(() => ({ metaPixel })),
      setGoogleAnalytics: (googleAnalytics) => set(() => ({ googleAnalytics })),
      // setWhatsappSupport: (whatsappSupport) => set(() => ({ whatsappSupport })),
      setPageExpiry: (pageExpiry) => set(() => ({ pageExpiry })),
      setPageExpiryDate: (pageExpiryDate) => set(() => ({ pageExpiryDate })),
      setDeactivateSales: (deactivateSales) => set(() => ({ deactivateSales })),
      setPageOwner: (pageOwner) => set(() => ({ pageOwner })),
      setTemplate: (template) => set(() => ({ template })),
      setColor: (color) =>
        set((state) => ({ color: { ...state.color, hex: color } })),
    }),
    {
      name: "page-inputs-storage",
      storage: createJSONStorage(() => urlHashStorage),
    }
  )
);

export const useFileHandler = create(
  persist<TFileHandler>(
    (set) => ({
      imagesPreview: {
        customise: [],
        details: [],
        product: [],
      },
      setImagesPreview: ({
        validFiles,
        countLimit,
        from,
        action,
        index,
        uploadingStatus,
        uploadedFileId,
        uploadedFileUrl,
        filesToRePush,
      }) => {
        set((state) => {
          const newImagesPreview = { ...state.imagesPreview };

          if (action === "re-pushViaIndex" && index !== undefined) {
            const updatedFiles = newImagesPreview[from].filter(
              (_, i) => i !== index
            );

            updatedFiles.slice(0, countLimit); // Ensure we don't exceed countLimit

            return {
              imagesPreview: newImagesPreview,
            };
          }

          if (action === "re-push" && filesToRePush !== undefined) {
            const updatedFiles = [...filesToRePush];
            newImagesPreview[from] = updatedFiles.slice(0, countLimit); // Ensure we don't exceed countLimit

            return {
              imagesPreview: newImagesPreview,
            };
          }

          if (from && countLimit && validFiles) {
            if (
              newImagesPreview[from] &&
              newImagesPreview[from].length >= countLimit
            ) {
              showToast(
                "Action not Allowed!",
                `You crossed file uploading limit`,
                "Close",
                () => {}
              );

              return {
                imagesPreview: newImagesPreview,
              };
            }

            if (action === "add") {
              const updatedFiles = [...newImagesPreview[from], ...validFiles];
              newImagesPreview[from] = updatedFiles.slice(0, countLimit); // Ensure we don't exceed countLimit
              return {
                imagesPreview: newImagesPreview,
              };
            }
          }

          // If update with appwrite creadencial
          if (
            action === "update" &&
            index !== undefined &&
            uploadingStatus !== undefined &&
            uploadedFileId !== undefined &&
            uploadedFileUrl !== undefined
          ) {
            const updatedFile = {
              ...newImagesPreview[from][index],
              status: uploadingStatus,
              fileData: {
                ...newImagesPreview[from][index].fileData,
                uploadedFileUrl,
                uploadedFileId,
              },
            };

            newImagesPreview[from][index] = updatedFile;

            return {
              imagesPreview: newImagesPreview,
            };
          }

          // If update with not appwrite creadencial
          if (
            action === "update" &&
            index !== undefined &&
            uploadingStatus !== undefined
          ) {
            const updatedFile = {
              ...newImagesPreview[from][index],
              status: uploadingStatus,
            };

            newImagesPreview[from][index] = updatedFile;

            return {
              imagesPreview: newImagesPreview,
            };
          }

          if (
            action === "delete" &&
            index !== undefined &&
            uploadingStatus !== undefined
          ) {
            const updatedFile = {
              ...newImagesPreview[from][index],
              status: uploadingStatus,
            };

            newImagesPreview[from][index] = updatedFile;

            return {
              imagesPreview: newImagesPreview,
            };
          }

          return {
            imagesPreview: newImagesPreview,
          };
        });
      },
    }),
    {
      name: "file-handler-storage",
      storage: createJSONStorage(() => urlHashStorage),
    }
  )
);


export const usePageSeo = create(
  persist<TPageSeo>(
    (set) => ({
      metaTitle: "",
      keywords: "",
      metaDesc: "",
      setMetaTitle: (metaTitle) => set(() => ({ metaTitle })),
      setKeywords: (keywords) => set(() => ({ keywords })),
      setMetaDesc: (metaDesc) => set(() => ({ metaDesc })),
    }),
    {
      name: "page-seo-handler-storage",
      storage: createJSONStorage(() => urlHashStorage),
    }
  )
);