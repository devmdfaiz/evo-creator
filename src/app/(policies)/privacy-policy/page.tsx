import { MainComponentsWrapperOnly } from "@/components/global/wrapper/MainComponentsWrapper";
import TypographyH3 from "@/components/typography/TypographyH3";
import { evar } from "@/lib/envConstant";
import { ReactNode } from "react";

const PrivacyPolicy = () => {
  return (
    <MainComponentsWrapperOnly>
      <div className="py-2">
        <TypographyH3>{evar.registeredProjectName} Privacy Policy</TypographyH3>
      </div>

      <ParaWrapper>
        <ParaHeaderWrapper>Updated as on 5 February 2024</ParaHeaderWrapper>

        <p>
          This privacy policy (the {"Privacy Policy"}) applies to your use of the
          website of {evar.registeredProjectName} hosted on vercel.com and its
          applications on mobile platforms (collectively ({`"
          ${evar.registeredProjectName}"`} or {"Website"})).
        </p>
      </ParaWrapper>

      <p>
        The terms “We”, “Our” and “Us” refer to {evar.registeredProjectName} and
        the terms “You”, “Your” and “User” refer to you as a user of{" "}
        {evar.registeredProjectName}. The term “Personal Information” means
        information that you provide to us which personally identifies you to be
        contacted or identified, such as your name, phone number, email address,
        and any other data that is tied to such information. Our practices and
        procedures in relation to the collection and use of Personal Information
        have been set out below in order to ensure safe usage of the Website for
        you.
      </p>

      <ParaWrapper>
        <ParaHeaderWrapper>1. Information that we collect</ParaHeaderWrapper>
        <p>
          We collect your personal information in order to provide and
          continually improve our products and services.
        </p>
        <p>We collect the following type of information:</p>
        <ul>
          <li>
            <strong>Information you give us:</strong> We receive and store any
            information you provide in relation to {evar.registeredProjectName}.
            This information may include the following but not limited to name,
            phone number, Address, Date of Birth, Gender, email id, PAN card
            number and bank account details.
          </li>
          <li>
            <strong>Automatic information:</strong> We automatically collect and
            store certain types of information about your use of{" "}
            {evar.registeredProjectName}. Like many websites, we use cookies and
            other unique identifiers, and we obtain certain types of information
            when your web browser accesses the {evar.registeredProjectName}{" "}
            website.
          </li>
          <li>
            <strong>Information from other Sources:</strong> We may collect
            information about you through your partners to whom we may be
            associated with to provide our services.
          </li>
        </ul>
      </ParaWrapper>

      <ParaWrapper>
        {" "}
        <ParaHeaderWrapper>2. Data Collection on the Website</ParaHeaderWrapper>
        <p>
          The data processing on this website is carried out by the website
          operator. The contact details of the website operator can be found in
          the imprint of this website.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        {" "}
        <ParaHeaderWrapper>
          3. How we use your information/data
        </ParaHeaderWrapper>
        <ul>
          <li>To provide the service which we are offering to you</li>
          <li>To refer services of affiliates, if any</li>
          <li>To comply with statutory and other requirements under law</li>
          <li>To reply to your queries being submitted by you</li>
          <li>To make our website and services better</li>
          <li>
            To send out communication regarding any payment or any other charges
          </li>
          <li>
            To send you promotional offers, new services available on our
            website or third parties with whom we have a tie-up
          </li>
          <li>To resolve problems with any services provided to you</li>
          <li>To perform internal analysis</li>
        </ul>
      </ParaWrapper>

      <ParaWrapper>
        {" "}
        <ParaHeaderWrapper>4. Controller of the information</ParaHeaderWrapper>
        <p>
          Your Personal Information will be collected by and/or stored by{" "}
          {evar.registeredProjectName} including its authorized representatives,
          affiliates, and business partners.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        {" "}
        <ParaHeaderWrapper>
          5. How we share your personal information
        </ParaHeaderWrapper>
        <ul>
          <li>
            You agree and acknowledge that we may share your personal
            information with our data partners/service providers/affiliates and
            payment partners who assist in providing services (including their
            services) to {evar.registeredProjectName}. We restrict the
            collection and use of your personal information.
          </li>
          <li>
            {evar.registeredProjectName} does not let anyone use your account
            information and any other personal identifiable information. Third
            parties, if any, who have tie-up with us may contact you for
            specific purposes and tell you about our services but with limited
            access, and they are required to maintain the confidentiality of the
            information as mentioned in the contract with us.
          </li>
          <li>
            You agree and acknowledge that we may share your personal
            information with government agencies under the law in case of
            identity verification, investigation of cyber incidents, hearings,
            and punishment of offences, or where disclosure of information is
            required for legal purposes. We may also need to disclose the
            information to third parties under the law.
          </li>
          <li>
            {evar.registeredProjectName} works with {evar.pgName} for payment
            processing for relevant sellers. If you use {evar.pgName} for
            payment processing, the data relevant to such payments undertaken
            using {evar.pgName}, is processed directly in {evar.pgName}’s system
            and is not stored on our platform. This is data such as name,
            address, and email address, order details and price/currency as well
            as the payment data such as credit card number or IBAN. We may
            disclose your information to {evar.pgName} and other payment
            providers, if applicable and thereafter, the use of your information
            is dependent on their privacy policies for which{" "}
            {evar.registeredProjectName} is not responsible.
          </li>
        </ul>
      </ParaWrapper>

      <ParaWrapper>
        {" "}
        <ParaHeaderWrapper>6. Tracking via Cookies</ParaHeaderWrapper>
        <p>
          {evar.registeredProjectName} and its partners use cookies to analyze
          trends, manage the website, improve marketing, track users’
          preferences around the website, and collect demographic figures for
          overall use. You can control the use of cookies at an individual
          browser stage by disabling these cookies that may restrict your use of
          certain features or services on our website.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        {" "}
        <ParaHeaderWrapper>7. Additional Information</ParaHeaderWrapper>
        <ul>
          <li>
            <strong>Location Information:</strong> When You use the Website
            through a telecommunication device, we collect Your location data.
            If You permit the Website to access Your location through the
            permission system used by Your mobile/web operating system, We may
            also collect the precise location of Your device when the web/app is
            running in the foreground or background. We may also derive Your
            approximate location from Your IP address.
          </li>
          <li>
            <strong>Device Information:</strong> We may collect information
            about Your hardware device, including, for example, the model,
            operating system and version, software and file names, preferred
            language, unique device identifier, advertising identifiers, serial
            number, device motion information, and mobile network information.
          </li>
        </ul>
      </ParaWrapper>

      <ParaWrapper>
        {" "}
        <ParaHeaderWrapper>8. Security</ParaHeaderWrapper>
        <p>
          We use industry-standard measures to protect the Personal Information
          that is stored in our database. We follow industry-standard practices
          on information security, as also mentioned on our website. We limit
          the access to your Personal Information to those employees and
          contractors who need access to perform their job function, such as our
          customer service personnel. You hereby acknowledge that{" "}
          {evar.registeredProjectName} is not responsible for any intercepted
          information sent via the internet, and you hereby release us from any
          and all claims arising out of or related to the use of intercepted
          information in any unauthorized manner.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        {" "}
        <ParaHeaderWrapper>9. Deleting your information</ParaHeaderWrapper>
        <p>
          If you wish to delete your account or personal information, please
          send an email request to us at {evar.supportEmail} for deletion of
          your information. Provided there is no regulatory or legal obligation
          to retain the data, on receiving your request for deletion, we will
          erase your data and discontinue sending you any further communications
          in context to the products opted by you.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        {" "}
        <ParaHeaderWrapper>10. Applicable Law</ParaHeaderWrapper>
        <p>
          Your use of this Website will be governed by and construed in
          accordance with the laws of India. The Users agree that any legal
          action or proceedings arising out of your use may be brought
          exclusively in the competent courts/tribunals having jurisdiction in
          New Delhi, India, and irrevocably submit themselves to the
          jurisdiction of such courts/tribunals.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        {" "}
        <ParaHeaderWrapper>
          11. Complaints and Grievance Redressal
        </ParaHeaderWrapper>
        <p>
          If you contact us to provide feedback, register a complaint, or ask a
          question, we will record any Personal Information and other content
          that you provide in your communication so that we can effectively
          respond to your communication. Any complaints or concerns in relation
          to your Personal Information or content of this Website or any dispute
          or breach of confidentiality or any proprietary rights of User during
          use of the Website or any intellectual property of any User should be
          immediately informed to the Data Protection Officer at the coordinates
          mentioned below in writing or by way of raising a grievance ticket
          through the hyperlink mentioned below:
        </p>
        <h3>Data Protection/Grievance Officer</h3>
        <p>{evar.registeredProjectName}</p>
        <p>
          <b>Address:</b> {evar.address}
        </p>
        <p>
          <b>Email:</b> {evar.supportEmail}
        </p>
      </ParaWrapper>

      <ParaWrapper>
        {" "}
        <ParaHeaderWrapper>12. Additional Terms</ParaHeaderWrapper>
        <ul>
          <li>
            By visiting our Website and/or by providing Your information and/or
            by availing Our services, You consent to the collection, storage,
            and use of the information You disclose on our Website in accordance
            with this Privacy Policy, including but not limited to, your consent
            for sharing your information as per this Privacy Policy. You
            acknowledge and agree that even if You are not a registered User
            with Us, We may collect information about You if a registered User
            has provided Us with Your information to facilitate services.
          </li>
          <li>
            If we decide to change our Privacy Policy, We will post those
            changes on this page so that You are always aware of what
            information We collect, how We use it, and under what circumstances
            We disclose it. If You do not agree for the foregoing, please do not
            continue to use or access our Website.
          </li>
          <li>
            During the registration process, We indicate fields that are
            mandatorily required to be filled and fields that are optional. The
            Users may decide whether or not to provide such information to Us.
            In case you choose to decline to submit information on the Platform,
            We may not be able to provide certain services to You, and We shall
            not be liable and/or responsible for non-provision of services to
            You. Any information provided by You will not be considered as
            sensitive and confidential if it is freely available and/or
            accessible in the public domain.
          </li>
        </ul>
      </ParaWrapper>
    </MainComponentsWrapperOnly>
  );
};

export const ParaHeaderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <p className="mb-2">
      <b>{children}</b>
    </p>
  );
};

export const ParaWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="my-2">{children}</div>;
};

export default PrivacyPolicy;
