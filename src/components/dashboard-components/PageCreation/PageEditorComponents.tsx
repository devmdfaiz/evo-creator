import { AspectRatio } from "@/components/ui/aspect-ratio";

import { useEffect, useState } from "react";
import { usePageFormInputs, useFileHandler } from "@/context/zustand/store";
import { formatePageInputs } from "@/lib/utils/utils";
import {
  PageComponents,
  PageWrapper,
} from "../../global/PaymentPageView/PageViewComponents";
import { WhatsappSupportBar } from "@/components/global/paymentPage/pageComponents/ServerPageComponent";
import TypographyP from "@/components/typography/TypographyP";

export const PreviewBoxDesktop = () => {
  const inputs = usePageFormInputs();
  const files = useFileHandler();
  const [fieldValue, setFieldValue] = useState<any>(null);

  useEffect(() => {
    const fieldsInputFormatted = formatePageInputs(inputs, files);
    setFieldValue(fieldsInputFormatted);
  }, [inputs, files]);

  return (
    <div className="w-full h-full bg-white rounded-md overflow-hidden">
      <div className="flex gap-2 py-2 px-3 justify-end bg-slate-700">
        <div className="bg-blue-700 w-4 h-4 rounded-[50%]" />
        <div className="bg-green-700 w-4 h-4 rounded-[50%]" />
        <div className="bg-red-700 w-4 h-4 rounded-[50%]" />
      </div>
      <AspectRatio
        ratio={16 / 9}
        className="origin-top-left scale-50 w-[200%] overflow-y-scroll h-[200%]"
      >
        <PreviewFrame fieldValue={fieldValue} />
      </AspectRatio>
    </div>
  );
};

export const PreviewFrame = ({ fieldValue }: { fieldValue: any }) => {

  if (fieldValue?.settings?.pageExpiry) {
    if (
      new Date().getTime() >=
      new Date(fieldValue?.settings?.pageExpiryDate).getTime()
    ) {
      return (
        <div className="w-screen h-screen flex items-center justify-center">
          <TypographyP>The sale for this item has expired. Please check back later for new offers.</TypographyP>
        </div>
      );
    }
  }
  
  if (fieldValue?.settings?.deactivateSales) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <TypographyP>The sale for this item has ended. Thank you for your interest.</TypographyP>
      </div>
    );
  }
  

  const color = fieldValue?.theme?.color;
  const theme = fieldValue?.theme?.template;

  return (
    <PageWrapper fieldValue={fieldValue} color={color} theme={theme}>
      <PageComponents
        fieldValue={fieldValue}
        theme={theme}
        color={color}
      />
    </PageWrapper>
  );
};
