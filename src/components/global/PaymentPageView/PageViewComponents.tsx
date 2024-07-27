import {
  ProductPageForm,
  ProductPageFormMobile,
} from "@/components/global/paymentPage/PageForm";
import { cn } from "@/lib/utils/utils";
import { ReactNode } from "react";

import {
  ProductPageContact,
  ProductPageDesc,
  ProductPageFaq,
  ProductPageFooter,
  ProductPageProfile,
  ProductPageTitle,
  WhatsappSupportBar,
} from "@/components/global/paymentPage/pageComponents/ServerPageComponent";
import {
  ProductPageCover,
  ProductPageTestimonial,
} from "@/components/global/paymentPage/pageComponents/ClientsPageComponents";
import { Session } from "next-auth";
import { pageThemeProvider } from "@/lib/constants/index.constant";

/**
 * This function is for structure page components according to display sizes, theme and color
 * @location api/pg/[id]
 * @param param0
 * @returns
 */
export const PageWrapper = ({
  fieldValue,
  color,
  theme,
  children,
  className,
}: {
  fieldValue: any;
  color: string;
  theme: string;
  children: ReactNode;
  className?: string;
}) => {
  const pageTheme = pageThemeProvider(theme);

  return (
    <main className={cn(`${pageTheme} min-h-screen`, className)}>
      <div className="h-2 w-full" />
      <ProductPageFormMobile
        className="lg:hidden z-50"
        priceDetails={fieldValue?.pagePrice!}
        color={color}
        theme={theme}
        action="Checkout"
      />

      <div className="container mx-auto flex gap-10">
        <div
          className="pb-36 lg:pb-0 mt-11 flex flex-col justify-start items-start gap-7 overflow-hidden"
          style={{ flex: "1" }}
        >
          {children}
        </div>
        <div className="hidden lg:block" style={{ flex: ".5" }}>
          <ProductPageForm
            fieldsData={fieldValue?.settings?.formInputs}
            priceDetails={fieldValue?.pagePrice!}
            color={color}
            theme={theme}
            buttonText={fieldValue?.settings?.buttonText}
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
  color,
}: {
  fieldValue: any;
  theme: string;
  color: string;
}) => {
  const profileImg = fieldValue?.files?.customise[0]?.fileData?.uploadedFileUrl;

  return (
    <>
      {/* Title */}
      {fieldValue?.pageContent?.title && (
        <ProductPageTitle title={fieldValue?.pageContent?.title} />
      )}

      {/* Profile section */}
      {fieldValue?.theme?.ownerName && (
        <ProductPageProfile
          name={fieldValue?.theme?.ownerName}
          profile={profileImg}
        />
      )}

      {/* Cover */}
      {fieldValue?.files?.details?.length > 0 && (
        <ProductPageCover cover={fieldValue?.files?.details} theme={theme} />
      )}

      {/* desc */}
      {fieldValue?.pageContent?.pageDesc && (
        <ProductPageDesc desc={fieldValue?.pageContent?.pageDesc} />
      )}

      {/* contact */}
      {fieldValue?.theme?.ownerName ||
      fieldValue?.pageContent?.contEmail ||
      fieldValue?.pageContent?.contPhone ? (
        <ProductPageContact
          name={fieldValue?.theme?.ownerName}
          email={fieldValue?.pageContent?.contEmail}
          phone={fieldValue?.pageContent?.contPhone}
        />
      ) : (
        ""
      )}

      {/* testimonial */}
      {fieldValue?.pageContent?.testimonialsFields?.length > 0 && (
        <div className="testimonial-main-container w-full h-fit">
          <h4 className="text-lg font-semibold">Testimonials</h4>
          <ProductPageTestimonial
            testimonials={fieldValue?.pageContent?.testimonialsFields}
            color={color}
            theme={theme}
          />
        </div>
      )}

      {/* faq */}
      {fieldValue?.pageContent?.faqs?.length > 0 &&
        (fieldValue?.pageContent?.faqs).map((faq: any, i: number) => (
          <div key={i}>
            <h4 className="text-lg font-semibold">
              Frequently Asked Question(s)
            </h4>
            <ProductPageFaq
              key={i}
              trigger={faq?.question}
              content={faq?.answer}
            />
          </div>
        ))}

      {/* footer */}
      {fieldValue?.pageContent?.policies?.length > 0 &&
        (fieldValue?.pageContent?.policies).map((policy: any, i: number) => (
          <div key={i} className="flex justify-center items-center flex-wrap">
            <ProductPageFooter
              containt={policy?.content}
              title={policy?.title}
              theme={theme}
            />
          </div>
        ))}
    </>
  );
};
