import { MainComponentsWrapperOnly } from "@/components/global/wrapper/MainComponentsWrapper";
import TypographyH3 from "@/components/typography/TypographyH3";
import { evar } from "@/lib/envConstant";
import { ReactNode } from "react";
import { ParaHeaderWrapper, ParaWrapper } from "../privacy-policy/page";

const TermsAndConditions = () => {
  return (
    <MainComponentsWrapperOnly>
      <div className="py-2">
        <TypographyH3>{evar.registeredProjectName} Terms and Conditions</TypographyH3>
      </div>

      <ParaWrapper>
        <ParaHeaderWrapper>Introduction</ParaHeaderWrapper>
        <p>
          These terms and conditions (the {`${"Terms"}`}) govern your use of the {evar.registeredProjectName} platform (the {`${"Platform"}`}) and any services provided therein (the {`${"Services"}`}). By accessing or using the Platform, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, you must not use the Platform.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>1. Eligibility</ParaHeaderWrapper>
        <p>
          You must be at least 18 years old to use the Platform. By using the Platform, you represent and warrant that you meet this age requirement.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>2. Account Registration</ParaHeaderWrapper>
        <p>
          To access certain features of the Platform, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
        </p>
        <p>
          You are responsible for safeguarding your account credentials and for any activities or actions under your account. You agree to notify us immediately of any unauthorized use of your account.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>3. Use of the Platform</ParaHeaderWrapper>
        <p>
          You agree to use the Platform in compliance with all applicable laws and regulations. You shall not:
        </p>
        <ul>
          <li>Use the Platform for any unlawful purpose or in any manner that could damage, disable, overburden, or impair the Platform.</li>
          <li>Attempt to gain unauthorized access to any part of the Platform or any systems or networks connected to the Platform.</li>
          <li>Upload, post, or otherwise transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
        </ul>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>4. Payment and Fees</ParaHeaderWrapper>
        <p>
          Our Platform is free to use, but we charge a 5% fee on every transaction. By using our payment services, you agree to the terms and conditions of our payment gateway providers, including {evar.pgName}.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>5. Intellectual Property</ParaHeaderWrapper>
        <p>
          All content on the Platform, including text, graphics, logos, icons, images, audio clips, video clips, and software, is the property of {evar.registeredProjectName} or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>6. Limitation of Liability</ParaHeaderWrapper>
        <p>
          To the fullest extent permitted by applicable law, {evar.registeredProjectName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
        </p>
        <ul>
          <li>Your use of or inability to use the Platform;</li>
          <li>Any unauthorized access to or use of our servers and/or any personal information stored therein;</li>
          <li>Any interruption or cessation of transmission to or from the Platform;</li>
          <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Platform by any third party;</li>
          <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Platform.</li>
        </ul>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>7. Termination</ParaHeaderWrapper>
        <p>
          We may terminate or suspend your access to the Platform, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>8. Governing Law</ParaHeaderWrapper>
        <p>
          These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>9. Changes to the Terms</ParaHeaderWrapper>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>10. Contact Us</ParaHeaderWrapper>
        <p>
          If you have any questions about these Terms, please contact us at {evar.supportEmail}.
        </p>
      </ParaWrapper>
    </MainComponentsWrapperOnly>
  );
};

export default TermsAndConditions;
