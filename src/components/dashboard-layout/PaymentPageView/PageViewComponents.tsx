"use client";
import {
  ProductPageForm,
  ProductPageFormMobile,
} from "@/components/global/paymentPage/PageForm";
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
import { useFileHandler, usePageFormInputs } from "@/context/zustand/store";
import { TPagePrice } from "@/lib/types/index.type";
import { cn } from "@/lib/utils/utils";
import { ReactNode } from "react";

/**
 * This function is for structure page components according to dispay sizes, theme and color
 * @location api/pg/[id]
 * @param param0
 * @returns
 */
export const PageWrapper = ({
  fieldValue,
  color,
  theme,
  mode,
  display,
  pagePrice,
  children,
  className,
}: {
  fieldValue: any;
  color: string;
  theme: string;
  mode: "preview" | "production";
  display: "mobile" | "desktop";
  pagePrice?: TPagePrice;
  children: ReactNode;
  className?: string;
}) => {
  const inputs = usePageFormInputs();

  return (
    <main className={cn(`bg-white min-h-screen`, className)}>
      <div className="container mx-auto flex gap-10">
        <div className="pb-36 lg:pb-0" style={{ flex: "1" }}>
          {children}
        </div>
        <div className="" style={{ flex: ".5" }}>
          {mode === "preview" ? (
            <>
              {display === "desktop" ? (
                <ProductPageForm
                  className="block"
                  fieldsData={
                    mode === "preview"
                      ? inputs.pageOrderInputs
                      : fieldValue?.settings?.formInputs
                  }
                  priceDetails={
                    mode === "preview" ? pagePrice : fieldValue?.pagePrice!
                  }
                  color={color}
                  theme={theme}
                />
              ) : (
                <ProductPageFormMobile
                  className="lg:block"
                  priceDetails={
                    mode === "preview" ? pagePrice : fieldValue?.pagePrice!
                  }
                  color={color}
                  theme={theme}
                  action="Checkout"
                />
              )}
            </>
          ) : (
            <>
              <ProductPageForm
                fieldsData={fieldValue?.settings?.formInputs}
                priceDetails={fieldValue?.pagePrice!}
                color={color}
                theme={theme}
              />

              <ProductPageFormMobile
                priceDetails={fieldValue?.pagePrice!}
                color={color}
                theme={theme}
                action="Checkout"
              />
            </>
          )}

          {(mode === "preview"
            ? inputs.whatsappSupport
            : fieldValue?.settings?.whatsappSupport) && (
            <WhatsappSupprotBar
              WNumber={
                mode === "preview"
                  ? inputs.whatsappSupport
                  : fieldValue?.settings?.whatsappSupport
              }
            />
          )}
        </div>
      </div>
    </main>
  );
};

/**
 * This fuction contain all page react components.
 * Purpose of this function is to issolate all page react components to life eassy and code readeble.
 * @location api/pg/[id]
 * @param param0
 * @returns
 */

export const PageComponents = ({
  fieldValue,
  theme,
  mode,
  display,
  type,
}: {
  fieldValue: any;
  theme: string;
  mode: "preview" | "production";
  display: "mobile" | "desktop";
  type?: string;
}) => {
  const inputs = usePageFormInputs();
  const files = useFileHandler();

  const color = inputs?.color?.hex;
  // const theme = inputs?.template;


  return (
    <>
      {/* Title */}
      {(inputs.title || fieldValue?.pageContent?.title) && (
        <ProductPageTitle
          title={
            mode === "preview" ? inputs.title : fieldValue?.pageContent?.title
          }
        />
      )}

      {/* Profile section */}
      {fieldValue?.theme?.name && (
        <ProductPageProfile
          name={fieldValue?.theme?.name}
          profile={"/facebook.png"}
        />
      )}

      {/* Cover */}
      {(mode === "preview"
        ? files.imagesPreview.details
        : fieldValue?.pageContent?.coverImg
      ).length > 0 && (
        <ProductPageCover
          mode={mode}
          cover={
            mode === "preview"
              ? files.imagesPreview.details
              : fieldValue?.pageContent?.coverImg
          }
        />
      )}

      {/* desc */}
      {(inputs.pageDesc || fieldValue?.pageContent?.pageDesc) && (
        <ProductPageDesc
          desc={
            mode === "preview"
              ? inputs.pageDesc
              : fieldValue?.pageContent?.pageDesc
          }
        />
      )}

      {/* contact */}
      {inputs.pageOwner ||
      fieldValue?.theme?.name ||
      inputs.contEmail ||
      fieldValue?.pageContent?.contEmail ||
      inputs.contPhone ||
      fieldValue?.pageContent?.contPhone ? (
        <ProductPageContact
          name={mode === "preview" ? inputs.pageOwner : fieldValue?.theme?.name}
          email={
            mode === "preview"
              ? inputs.contEmail
              : fieldValue?.pageContent?.contEmail
          }
          phone={
            mode === "preview"
              ? inputs.contPhone
              : fieldValue?.pageContent?.contPhone
          }
        />
      ) : (
        ""
      )}

      {/* testimonial */}
      <h4 className="text-lg font-semibold my-2">Testimonials</h4>
      {(mode === "preview"
        ? inputs.testimonials
        : fieldValue?.pageContent?.testimonialsFields
      ).length > 0 && (
        <>
          <ProductPageTestimonial
            testimonials={
              mode === "preview"
                ? inputs.testimonials
                : fieldValue?.pageContent?.testimonialsFields
            }
            theme={theme}
          />
        </>
      )}

      {/* faq */}
      <h4 className="text-lg font-semibold my-2">
        Frequently Asked Question(s)
      </h4>
      {(mode === "preview" ? inputs.faqs : fieldValue?.pageContent?.faqs)
        .length > 0 &&
        (mode === "preview" ? inputs.faqs : fieldValue?.pageContent?.faqs).map(
          (faq: any, i: number) => (
            <ProductPageFaq
              key={i}
              trigger={faq?.question}
              content={faq?.answer}
            />
          )
        )}

      {/* footer */}
      <div className="my-6 flex justify-center items-center flex-wrap">
        {(mode === "preview"
          ? inputs.policies
          : fieldValue?.pageContent?.policies
        ).length > 0 &&
          (mode === "preview"
            ? inputs.policies
            : fieldValue?.pageContent?.policies
          ).map((policy: any, i: number) => (
            <ProductPageFooter
              key={i}
              containt={policy?.content}
              title={policy?.title}
              theme={theme}
            />
          ))}
      </div>
    </>
  );
};
