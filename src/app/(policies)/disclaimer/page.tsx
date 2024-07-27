import { MainComponentsWrapperOnly } from "@/components/global/wrapper/MainComponentsWrapper";
import TypographyH3 from "@/components/typography/TypographyH3";
import { evar } from "@/lib/envConstant";
import { ReactNode } from "react";
import { ParaHeaderWrapper, ParaWrapper } from "../privacy-policy/page";

const Disclaimer = () => {
  return (
    <MainComponentsWrapperOnly>
      <div className="py-2">
        <TypographyH3>{evar.registeredProjectName} Disclaimer</TypographyH3>
      </div>

      <ParaWrapper>
        <ParaHeaderWrapper>Introduction</ParaHeaderWrapper>
        <p>
          The information provided by {evar.registeredProjectName} (the {"Platform"}) is for general informational purposes only. All information on the Platform is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Platform.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>1. No Professional Advice</ParaHeaderWrapper>
        <p>
          The Platform does not provide any professional advice, including but not limited to, financial, legal, or medical advice. All information and content on the Platform are for general informational purposes only. You should consult with a qualified professional before making any decisions based on information provided on the Platform.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>2. No Warranty</ParaHeaderWrapper>
        <p>
          The Platform is provided on an {"as is"} and {"as available"} basis. {evar.registeredProjectName} makes no representations or warranties of any kind, express or implied, including but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. {evar.registeredProjectName} does not guarantee that the Platform will be available at all times or that the Platform will be free from errors or defects.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>3. Limitation of Liability</ParaHeaderWrapper>
        <p>
          In no event shall {evar.registeredProjectName}, its directors, employees, partners, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, or other intangible losses, resulting from (i) your use or inability to use the Platform; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; (iii) any interruption or cessation of transmission to or from the Platform; (iv) any bugs, viruses, or the like that may be transmitted to or through the Platform; or (v) any errors or omissions in any content.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>4. External Links</ParaHeaderWrapper>
        <p>
          The Platform may contain links to third-party websites or services that are not owned or controlled by {evar.registeredProjectName}. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that {evar.registeredProjectName} shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such third-party websites or services.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>5. Changes to the Disclaimer</ParaHeaderWrapper>
        <p>
          We reserve the right to update or modify this Disclaimer at any time without prior notice. Any changes will be effective immediately upon posting the updated Disclaimer on the Platform. Your continued use of the Platform following any changes constitutes your acceptance of the new Disclaimer.
        </p>
      </ParaWrapper>

      <ParaWrapper>
        <ParaHeaderWrapper>6. Contact Us</ParaHeaderWrapper>
        <p>
          If you have any questions about this Disclaimer, please contact us at {evar.supportEmail}.
        </p>
      </ParaWrapper>
    </MainComponentsWrapperOnly>
  );
};

export default Disclaimer;
