import PaymentsPagePatterns from "@/components/global/patterns/PaymentsPagePatterns";
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
import { TPagePrice } from "@/lib/types/index.type";
import { ReactNode } from "react";

{
  /* <ProductPageForm
fieldsData={
  mode === "preview"
    ? fieldValue?.fieldDetails
    : fieldValue?.settings?.formInputs
}
priceDetails={mode === "preview" ? pagePrice! : fieldValue?.pagePrice!}
color={color}
theme={theme}
/>
<ProductPageFormMobile
priceDetails={mode === "preview" ? pagePrice! : fieldValue?.pagePrice}
color={color}
theme={theme}
action="Checkout"
/>
{mode === "preview"
? fieldValue?.whatsappSupport
: fieldValue?.settings?.whatsappSupport && (
    <WhatsappSupprotBar
      WNumber={
        mode === "preview"
          ? fieldValue?.whatsappSupport
          : fieldValue?.settings?.whatsappSupport
      }
    />
  )} */
}

/**
 * This function is for structure page components according to dispay sizes, theme and color
 * @location api/pg/[id]
 * @param param0
 * @returns
 */
export const PageCont = ({
  fieldValue,
  color,
  theme,
  mode,
  pagePrice,
  children,
}: {
  fieldValue: any;
  color: string;
  theme: string;
  mode?: string;
  pagePrice?: TPagePrice;
  children: ReactNode;
}) => {
  return (
    <main className="bg-white min-h-screen">
      <div className="w-[1280px] mx-auto flex gap-10">
        <div className="" style={{ flex: "1" }}>
          {children}
        </div>
        <div className="" style={{ flex: ".5" }}>
          <ProductPageForm
            fieldsData={
              mode === "preview"
                ? fieldValue?.fieldDetails
                : fieldValue?.settings?.formInputs
            }
            priceDetails={
              mode === "preview" ? pagePrice! : fieldValue?.pagePrice!
            }
            color={color}
            theme={theme}
          />
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
  type,
}: {
  fieldValue: any;
  theme: string;
  type?: string;
}) => {
  return (
    <>
      {/* Title */}
      {fieldValue?.pageContent?.title && (
        <ProductPageTitle title={fieldValue?.pageContent?.title} />
      )}

      {/* Profile section */}
      {fieldValue?.theme?.name && (
        <ProductPageProfile
          name={fieldValue?.theme?.name}
          profile={"/facebook.png"}
        />
      )}

      {/* Cover */}
      {fieldValue?.pageContent?.coverImg && (
        <ProductPageCover cover={fieldValue?.pageContent?.coverImg} />
      )}

      {/* desc */}
      {fieldValue?.pageContent?.pageDesc && (
        <ProductPageDesc desc={fieldValue?.pageContent?.pageDesc} />
      )}

      {/* contact */}
      {fieldValue?.theme?.name ||
      fieldValue?.pageContent?.contEmail ||
      fieldValue?.pageContent?.contPhone ? (
        <ProductPageContact
          name={fieldValue?.theme?.name}
          email={fieldValue?.pageContent?.contEmail}
          phone={fieldValue?.pageContent?.contPhone}
        />
      ) : (
        ""
      )}

      {/* testimonial */}
      <h4 className="text-lg font-semibold my-2">Testimonials</h4>
      {fieldValue?.pageContent?.testimonialsFields.length > 0 &&
        fieldValue?.pageContent?.testimonialsFields.map(
          (field: any, i: number) => (
            <>
              <ProductPageTestimonial
                key={i}
                name={field?.testiName}
                text={field?.testiMsg}
                theme={theme}
              />
            </>
          )
        )}

      {/* faq */}
      <h4 className="text-lg font-semibold my-2">
        Frequently Asked Question(s)
      </h4>
      {fieldValue?.pageContent?.faqs.length > 0 &&
        fieldValue?.pageContent?.faqs.map((faq: any, i: number) => (
          <ProductPageFaq
            key={i}
            trigger={faq?.question}
            content={faq?.answer}
          />
        ))}

      {/* footer */}
      <div className="my-6 flex justify-center items-center flex-wrap">
        {fieldValue?.pageContent?.policies.length > 0 &&
          fieldValue?.pageContent?.policies.map((policy: any, i: number) => (
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
