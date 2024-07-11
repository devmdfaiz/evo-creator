"use client";
import "@/components/styles/pageStyles.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { ProductPageFormMobile } from "@/components/global/paymentPage/PageForm";
import { useContext, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TPagePrice } from "@/lib/types/index.type";
import { pageThemeProvider } from "@/lib/constants/index.constant";
import {
  ProductPageContact,
  ProductPageCover,
  ProductPageDesc,
  ProductPageFaq,
  ProductPageFooter,
  ProductPageProfile,
  ProductPageTestimonial,
  ProductPageTitle,
  WhatsappSupprotBar,
} from "@/components/global/paymentPage/SimplePage";
import { useRouter } from "next/navigation";
import { useFileHandler, usePageFormInputs } from "@/context/zustand/store";
import {
  PageComponents,
  PageWrapper,
} from "../PaymentPageView/PageViewComponents";
import { useZustandSelector } from "@/context/zustand/slectors";

/**
 * This function is for Mobile preview in page editor and creator.
 * @location app/payment-page/add/[page-type]
 * @returns
 */

export const PreviewBoxMobile = () => {
};

/**
 * This function is for Desktop preview in page editor and creator.
 * @location app/payment-page/add/[page-type]
 * @returns
 */

export const PreviewBoxDesktop = () => {
  const route = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string>("/payment-page/preview");

  const pageInputsState = useZustandSelector(usePageFormInputs);
  const inputs = usePageFormInputs();
  const files = useFileHandler();

  const color = inputs?.color?.hex;
  const theme = inputs?.template;

  const pagePrice: TPagePrice = {
    offerDiscountedPrice: inputs?.offerDiscountedPrice,
    price: inputs?.price,
    discountedPrice: inputs?.discountedPrice,
    priceType: inputs?.priceType,
    baseAuctionPrice: inputs?.baseAuctionPrice,
  };

  return (
    <div className="w-full h-full bg-white rounded-md overflow-hidden">
      <div className="flex gap-2 py-2 px-3 justify-end bg-slate-700">
        <div className="bg-blue-700 w-4 h-4 rounded-[50%]" />
        <div className="bg-green-700 w-4 h-4 rounded-[50%]" />
        <div className="bg-red-700 w-4 h-4 rounded-[50%]" />
      </div>
      <AspectRatio
        ratio={16 / 9}
        className={`overflow-y-scroll overflow-x-hidden aspect-ratio-desktop`}
      >
        <div className="origin-top-left scale-50 w-[200%] h-[500%]">
          <PageWrapper
            color={color}
            fieldValue={inputs}
            theme={theme}
            mode="preview"
            display="desktop"
            pagePrice={pagePrice}
          >
            <PageComponents
              fieldValue={inputs}
              mode="preview"
              theme={theme}
              display="desktop"
            />
          </PageWrapper>
        </div>
      </AspectRatio>
    </div>
  );
};

/**
 * This fuction contain all page react components.
 * Purpose of this function is to issolate all page react components to life eassy and code readeble.
 * @location app/payment-page/add/[page-type]
 * @returns
 */

// export const PreviewCont = ({
//   fieldValue,
//   mode,
// }: {
//   fieldValue: any;
//   mode?: string;
// }) => {
//   return (
//     <>
//       {/* Title */}
//       {fieldValue?.title && (
//         <ProductPageTitle
//           className={`${mode === "preview" ? "" : "text-[110%] leading-5"}`}
//           title={fieldValue?.title}
//         />
//       )}

//       {/* Profile section */}
//       {fieldValue?.pageOwner && (
//         <ProductPageProfile
//           name={fieldValue?.pageOwner}
//           profile={"/facebook.png"}
//           className={`${mode === "preview" ? "" : "text-[90%]"}`}
//         />
//       )}

//       {/* Cover */}
//       {fieldValue?.coverImg && (
//         <ProductPageCover cover={fieldValue?.coverImg} />
//       )}

//       {/* desc */}
//       {fieldValue?.pageDesc !== "<p></p>" && fieldValue?.pageDesc && (
//         <ProductPageDesc
//           TClassName={`${mode === "preview" ? "" : "text-[93%]"}`}
//           desc={fieldValue?.pageDesc}
//         />
//       )}

//       {/* contact */}
//       {fieldValue?.pageOwner ||
//       fieldValue?.contEmail ||
//       fieldValue?.contPhone ? (
//         <ProductPageContact
//           name={fieldValue?.pageOwner}
//           email={fieldValue?.contEmail}
//           phone={fieldValue?.contPhone}
//           TClassName={`${mode === "preview" ? "" : "text-[93%]"}`}
//           DClassName={`${mode === "preview" ? "" : "text-[90%]"}`}
//         />
//       ) : (
//         ""
//       )}

//       {/* testimonial */}
//       {fieldValue?.testimonialsFields?.length > 0 &&
//         fieldValue?.testimonialsFields?.map((field: any, i: number) =>
//           field?.testiName !== "" || field?.testiMsg !== "" ? (
//             <>
//               {i === 0 && (
//                 <h4
//                   className={`${
//                     mode === "preview"
//                       ? ""
//                       : "text-lg font-semibold my-2 text-[93%]"
//                   }`}
//                 >
//                   Testimonials
//                 </h4>
//               )}
//               <ProductPageTestimonial
//                 key={i}
//                 name={field?.testiName}
//                 text={field?.testiMsg}
//                 theme={fieldValue?.template}
//                 DClassName={`${mode === "preview" ? "" : "text-[90%]"}`}
//                 TClassName={`${mode === "preview" ? "" : "text-[93%]"}`}
//               />
//             </>
//           ) : (
//             ""
//           )
//         )}

//       {/* faq */}
//       {fieldValue?.faqs?.length > 0 &&
//         fieldValue?.faqs.map((faq: any, i: number) =>
//           faq?.question !== "" || faq?.answer !== "" ? (
//             <>
//               {i === 0 && (
//                 <h4
//                   className={`${
//                     mode === "preview"
//                       ? ""
//                       : "text-lg font-semibold my-2 text-[93%]"
//                   }`}
//                 >
//                   Frequently Asked Question(s)
//                 </h4>
//               )}
//               <ProductPageFaq
//                 key={i}
//                 trigger={faq?.question}
//                 content={faq?.answer}
//               />
//             </>
//           ) : (
//             ""
//           )
//         )}

//       {/* footer */}
//       <div className="my-6 flex justify-center items-center flex-wrap">
//         {fieldValue?.policies?.length > 0 &&
//           fieldValue?.policies?.map((policy: any, i: number) =>
//             policy?.content !== "" || policy?.title !== "" ? (
//               <ProductPageFooter
//                 key={i}
//                 containt={policy?.content}
//                 title={policy?.title}
//                 theme={fieldValue?.template}
//               />
//             ) : (
//               ""
//             )
//           )}
//       </div>
//     </>
//   );
// };
