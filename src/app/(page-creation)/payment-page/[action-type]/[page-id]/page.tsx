"use client";
import "@/components/styles/pageStyles.css";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LaptopIcon, MobileIcon } from "@radix-ui/react-icons";
import { TPagePrice } from "@/lib/types/index.type";
import { useZustandSelector } from "@/context/zustand/slectors";
import { useFileHandler, usePageFormInputs } from "@/context/zustand/store";
import TypographyMuted from "@/components/typography/TypographyMuted";
import { useSearchParams } from "next/navigation";
import { formatePageInputs } from "@/lib/utils/utils";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import { PageComponents, PageWrapper } from "@/components/global/PaymentPageView/PageViewComponents";
import PageTabs from "@/components/dashboard-components/PageCreation/tabs";
import { PreviewBoxDesktop } from "@/components/dashboard-components/PageCreation/PageEditorComponents";

/**
 * Page creator and editor main component
 * @param param0
 * @returns
 */
const PageEditor = ({ params }: { params: { ["page-id"]: string } }) => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const inputs = usePageFormInputs();
  const files = useFileHandler();
  const [fieldValue, setFieldValue] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  const session = useSession();

  const color = fieldValue?.theme?.color;
  const theme = fieldValue?.theme?.template;

  useEffect(() => {
    const fieldsInputFormatted = formatePageInputs(inputs, files);
    setFieldValue(fieldsInputFormatted);
  }, [inputs, files]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted){
    return <PageSpinner />
  }

  if (mode === "preview") {
    return (
      <PageWrapper fieldValue={fieldValue} color={color} theme={theme}>
        <PageComponents
          fieldValue={fieldValue}
          theme={theme}
          color={color}
        />
      </PageWrapper>
    );
  }

  return (
    <div className="lg:flex items-start justify-center bg-background min-h-screen">
      <div className="px-5 py-5 bg-card min-h-screen" style={{ flex: ".5" }}>
        <PageTabs pageId={params["page-id"]} />
      </div>
      <div
        className="grow bg-background h-full text-black hidden lg:block"
        style={{ flex: "1" }}
      >
        {/* previewbox */}
        <Tabs defaultValue="desktop" className="w-[80%] h-fit mx-auto mt-28">
          <TabsList>
            <TabsTrigger value="desktop">
              <LaptopIcon className="h-6" />
            </TabsTrigger>
            {/* <TabsTrigger value="mobile">
              <MobileIcon className="h-6" />
            </TabsTrigger> */}
          </TabsList>
          <TabsContent value="desktop">
            <PreviewBoxDesktop />
          </TabsContent>
          {/* <TabsContent value="mobile">
            <PreviewBoxMobile />
            <TypographyMuted>
              This section is still in under development
            </TypographyMuted>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

export default PageEditor;
