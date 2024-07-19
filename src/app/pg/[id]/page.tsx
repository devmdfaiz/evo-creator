import { PageInputsWithFormForMobileFormSolution } from "@/components/global/paymentPage/PageForm";
import { getPublicPageData } from "@/lib/fetch/fetch";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../AuthOptions";
import {
  PageComponents,
  PageWrapper,
} from "@/components/dashboard-layout/PaymentPageView/PageViewComponents";
import TypographyP from "@/components/typography/TypographyP";
import { pageThemeProvider } from "@/lib/constants/index.constant";
import { cn } from "@/lib/utils/utils";

/**
 * Payment page main component
 * @param param0
 * @returns
 */
const PaymentPage = async ({
  params: { id },
  searchParams: { checkout },
}: {
  params: { id: string };
  searchParams: { checkout?: string };
}) => {
  const { fieldValue, error } = await getPublicPageData(id);
  const session = await getServerSession(authOptions);

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <TypographyP>{error}</TypographyP>
      </div>
    );
  }

  if (fieldValue.settings.publishStatus === "private") {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <TypographyP>
          This sales page is currently private. Please contact the seller for
          more information.
        </TypographyP>
      </div>
    );
  }

  if (fieldValue.settings.publishStatus === "draft") {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <TypographyP>
          This page is not available. It is still in draft mode.
        </TypographyP>
      </div>
    );
  }

  if (fieldValue.settings.pageExpiry) {
    if (
      new Date().getTime() >=
      new Date(fieldValue.settings.pageExpiryDate).getTime()
    ) {
      return (
        <div className="w-screen h-screen flex items-center justify-center">
          <TypographyP>
            The sale for this item has expired. Please check back later for new
            offers.
          </TypographyP>
        </div>
      );
    }
  }

  if (fieldValue.settings.deactivateSales) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <TypographyP>
          The sale for this page has ended. Thank you for your interest.
        </TypographyP>
      </div>
    );
  }

  const color = fieldValue.theme.color;
  const theme = fieldValue.theme.template;

  if (checkout === "yes") {
    const pageTheme = pageThemeProvider(theme);

    return (
      <main className={cn(`${pageTheme} min-h-screen`)}>
        <PageInputsWithFormForMobileFormSolution
          fieldsData={fieldValue?.settings?.formInputs}
          color={color}
          theme={theme}
          priceDetails={fieldValue?.pagePrice!}
          action={fieldValue?.settings?.buttonText}
        />
      </main>
    );
  }

  return (
    <PageWrapper fieldValue={fieldValue} color={color} theme={theme}>
      <PageComponents
        fieldValue={fieldValue}
        theme={theme}
        session={session}
        color={color}
      />
    </PageWrapper>
  );
};

export default PaymentPage;
