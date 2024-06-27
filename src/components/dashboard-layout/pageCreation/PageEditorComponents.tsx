"use client";
import "@/components/styles/pageStyles.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import {
  ProductPageFormMobile,
} from "@/components/global/paymentPage/PageForm";
import { useContext } from "react";
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

/**
 * This function is for Mobile preview in page editor and creator.
 * @location app/payment-page/add/[page-type]
 * @returns
 */

export const PreviewBoxMobile = () => {
  const { fieldValue } = useContext(PageContext);
  const color = fieldValue?.color?.hex;
  const theme = fieldValue?.template;

  const pagePrice: TPagePrice = {
    offerDiscountedPrice: fieldValue?.offerDiscountedPrice,
    price: fieldValue?.price,
    discountedPrice: fieldValue?.discountedPrice,
    priceType: fieldValue?.priceType,
    baseAuctionPrice: fieldValue?.baseAuctionPrice,
  };

  const themeClass = pageThemeProvider(theme);

  return (
    <ScrollArea
      className={`${themeClass} rounded-md h-[70vh] lg:w-[300px] xl:w-[325px] 2xl:w-[350px] mx-auto relative`}
    >
      <ProductPageFormMobile
        color={color}
        theme={theme}
        priceDetails={pagePrice}
        action="Checkout"
        className="absolute z-10 lg:block"
      />

      <WhatsappSupprotBar
        WNumber={fieldValue?.whatsappSupport}
        className="scale-75 absolute bottom-[18px] right-[29px] lg:right-[29px] z-10 "
      />

      <div className="bg-black w-[100px] h-[6px] rounded-b-md absolute lg:left-[35%] left-[36%] z-10" />
      <div className="w-[20px] h-[20px] bg-black absolute left-[20px] top-[13px] rounded-full z-10" />

      <div className={`${themeClass} pb-[120px] w-full`}>
        <div className={`w-full h-[8px]`} style={{ backgroundColor: color }} />

        {/* Page containt wrapper */}
        <div className="w-full h-full px-5">
          <PreviewCont fieldValue={fieldValue} />
        </div>
      </div>
    </ScrollArea>
  );
};

/**
 * This function is for Desktop preview in page editor and creator.
 * @location app/payment-page/add/[page-type]
 * @returns
 */

export const PreviewBoxDesktop = () => {
  const { fieldValue } = useContext(PageContext);
  const color = fieldValue?.color?.hex;
  const theme = fieldValue?.template;

  const pagePrice: TPagePrice = {
    offerDiscountedPrice: fieldValue?.offerDiscountedPrice,
    price: fieldValue?.price,
    discountedPrice: fieldValue?.discountedPrice,
    priceType: fieldValue?.priceType,
    baseAuctionPrice: fieldValue?.baseAuctionPrice,
  };

  const themeClass = pageThemeProvider(theme);

  return (
    <div className="w-full h-full bg-slate-700 rounded-md overflow-hidden">
      <div className="flex gap-2 py-2 px-3 justify-end">
        <div className="bg-blue-700 w-4 h-4 rounded-[50%]" />
        <div className="bg-green-700 w-4 h-4 rounded-[50%]" />
        <div className="bg-red-700 w-4 h-4 rounded-[50%]" />
      </div>
      <AspectRatio ratio={16 / 9} className={`${themeClass} overflow-hidden`}>
      <iframe 
      src="/payment-page/create/665d9540609ffd04a4596aae?mode=preview" 
      className="origin-top-left scale-50 w-[200%] h-[200%]"
    ></iframe>
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

export const PreviewCont = ({
  fieldValue,
  mode,
}: {
  fieldValue: any;
  mode?: string;
}) => {
  return (
    <>
      {/* Title */}
      {fieldValue?.title && (
        <ProductPageTitle
          className={`${mode === "preview" ? "" : "text-[110%] leading-5"}`}
          title={fieldValue?.title}
        />
      )}

      {/* Profile section */}
      {fieldValue?.pageOwner && (
        <ProductPageProfile
          name={fieldValue?.pageOwner}
          profile={"/facebook.png"}
          className={`${mode === "preview" ? "" : "text-[90%]"}`}
        />
      )}

      {/* Cover */}
      {fieldValue?.coverImg && (
        <ProductPageCover cover={fieldValue?.coverImg} />
      )}

      {/* desc */}
      {fieldValue?.pageDesc !== "<p></p>" && fieldValue?.pageDesc && (
        <ProductPageDesc
          TClassName={`${mode === "preview" ? "" : "text-[93%]"}`}
          desc={fieldValue?.pageDesc}
        />
      )}

      {/* contact */}
      {fieldValue?.pageOwner ||
      fieldValue?.contEmail ||
      fieldValue?.contPhone ? (
        <ProductPageContact
          name={fieldValue?.pageOwner}
          email={fieldValue?.contEmail}
          phone={fieldValue?.contPhone}
          TClassName={`${mode === "preview" ? "" : "text-[93%]"}`}
          DClassName={`${mode === "preview" ? "" : "text-[90%]"}`}
        />
      ) : (
        ""
      )}

      {/* testimonial */}
      {fieldValue?.testimonialsFields?.length > 0 &&
        fieldValue?.testimonialsFields?.map((field: any, i: number) =>
          field?.testiName !== "" || field?.testiMsg !== "" ? (
            <>
              {i === 0 && (
                <h4
                  className={`${
                    mode === "preview"
                      ? ""
                      : "text-lg font-semibold my-2 text-[93%]"
                  }`}
                >
                  Testimonials
                </h4>
              )}
              <ProductPageTestimonial
                key={i}
                name={field?.testiName}
                text={field?.testiMsg}
                theme={fieldValue?.template}
                DClassName={`${mode === "preview" ? "" : "text-[90%]"}`}
                TClassName={`${mode === "preview" ? "" : "text-[93%]"}`}
              />
            </>
          ) : (
            ""
          )
        )}

      {/* faq */}
      {fieldValue?.faqs?.length > 0 &&
        fieldValue?.faqs.map((faq: any, i: number) =>
          faq?.question !== "" || faq?.answer !== "" ? (
            <>
              {i === 0 && (
                <h4
                  className={`${
                    mode === "preview"
                      ? ""
                      : "text-lg font-semibold my-2 text-[93%]"
                  }`}
                >
                  Frequently Asked Question(s)
                </h4>
              )}
              <ProductPageFaq
                key={i}
                trigger={faq?.question}
                content={faq?.answer}
              />
            </>
          ) : (
            ""
          )
        )}

      {/* footer */}
      <div className="my-6 flex justify-center items-center flex-wrap">
        {fieldValue?.policies?.length > 0 &&
          fieldValue?.policies?.map((policy: any, i: number) =>
            policy?.content !== "" || policy?.title !== "" ? (
              <ProductPageFooter
                key={i}
                containt={policy?.content}
                title={policy?.title}
                theme={fieldValue?.template}
              />
            ) : (
              ""
            )
          )}
      </div>
    </>
  );
};
