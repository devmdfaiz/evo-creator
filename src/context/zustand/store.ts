import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { urlHashStorage } from "./urlHashStorage";
import {
  TErrorHandler,
  TPageFormInputs,
  TPaymentPageFieldData,
} from "./store.types";
import { CATEGORIES_DATA } from "@/lib/constants/index.constant";

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
      coverImg: "",
      pageDesc: "",
      contPhone: null,
      contEmail: "",
      testimonials: [{ testiName: "", testiMsg: "" }],
      faqs: [{ question: "", answer: "" }],
      policies: [{ title: "", content: "" }],
      pageOrderInputsInitial: pageOrderInputsInitialValue,
      pageOrderInputs: [
        { type: "text-text", placeholder: "Full Name", required: true },
        { type: "number-phone", placeholder: "Phone Number", required: true },
        { type: "email-email", placeholder: "Email", required: true },
      ],
      thankYouNote: "",
      redirectionUrl: "",
      metaPixel: "",
      googleAnalytics: "",
      whatsappSupport: null,
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
      setCoverImg: (coverImg) => set(() => ({ coverImg })),
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
      setRedirectionUrl: (redirectionUrl) => set(() => ({ redirectionUrl })),
      setMetaPixel: (metaPixel) => set(() => ({ metaPixel })),
      setGoogleAnalytics: (googleAnalytics) => set(() => ({ googleAnalytics })),
      setWhatsappSupport: (whatsappSupport) => set(() => ({ whatsappSupport })),
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
