import { MainComponentsWrapperOnly } from "@/components/global/wrapper/MainComponentsWrapper";
import TypographyH3 from "@/components/typography/TypographyH3";
import { evar } from "@/lib/envConstant";
import { ReactNode } from "react";
import { ParaHeaderWrapper, ParaWrapper } from "../privacy-policy/page";

const RefundPolicy = () => {
  return (
    <MainComponentsWrapperOnly>
      <div className="py-2">
        <TypographyH3>
          {evar.registeredProjectName} Cancellation & Refund Policy
        </TypographyH3>
      </div>

      <ParaWrapper>
        <ParaHeaderWrapper>Updated as on 25 July 2024</ParaHeaderWrapper>

        <p>
          This Cancellation & Refund Policy (the {"Policy"}) applies to your use
          of the website of {evar.registeredProjectName} hosted on Vercel.com
          and its applications on mobile platforms (collectively ({`"
          ${evar.registeredProjectName}"`} or {"Website"})).
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>1. Cancellation Policy</ParaHeaderWrapper>
        <p>
          Since {evar.registeredProjectName} does not sell products directly, we
          do not handle cancellations. If you need to cancel a purchase, please
          review the refund policy provided by the creator of the product you
          purchased. You can find the {"creator's"} contact information and refund
          policy on the payment page.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>2. Refund Policy</ParaHeaderWrapper>
        <p>
          Refunds are handled directly by the creators of the products listed on{" "}
          {evar.registeredProjectName}. We do not manage refunds ourselves. If
          you have any concerns regarding a product or wish to request a refund,
          please contact the creator directly using the information provided on
          the payment page.
        </p>
        <p>
          If you suspect fraud or encounter issues with a product, please email
          us at {evar.supportEmail}. We will review the situation and take
          appropriate action against the creators, including removing them from
          our platform if necessary.
        </p>
        <p>
          Please note that {evar.registeredProjectName} only charges a 5% fee on
          each transaction, and this fee is non-refundable.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>3. Additional Information</ParaHeaderWrapper>
        <p>
          For any further assistance or inquiries, please contact our support
          team at {evar.supportEmail}. We are committed to ensuring a secure and
          reliable platform for all users.
        </p>
      </ParaWrapper>
    </MainComponentsWrapperOnly>
  );
};

export default RefundPolicy;
