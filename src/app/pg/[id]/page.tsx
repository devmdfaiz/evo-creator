import {
  PageComponents,
  PageWrapper,
} from "@/components/dashboard-layout/PaymentPageView/PageViewComponents";
import { PageInputsWithFormForMobileFormSolution } from "@/components/global/paymentPage/PageForm";
import { getPageData } from "@/lib/fetch/pageData";
import { authOptions } from "../../../../AuthOptions";
import { getServerSession } from "next-auth";

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
  const fieldValue = await getPageData(id);
  const color = fieldValue?.theme?.color;
  const theme = fieldValue?.theme?.template;
  

  if (checkout === "yes") {
    return (
      <PageInputsWithFormForMobileFormSolution
        fieldsData={fieldValue?.settings?.formInputs}
        color={color}
        theme={theme}
        priceDetails={fieldValue?.pagePrice!}
        action="Place Order"
      />
    );
  }

  return (
    <>
      {/* <PageWrapper fieldValue={fieldValue} color={color} theme={theme}>
        <PageComponents fieldValue={fieldValue} theme={theme} />
      </PageWrapper> */}
    </>
  );
};

export default PaymentPage;
