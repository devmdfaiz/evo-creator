"use client";
import "@/components/styles/pageStyles.css";
import PageTabs from "@/components/dashboard-layout/pageCreation/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import {
  ProductPageForm,
  ProductPageFormMobile,
} from "@/components/global/paymentPage/PageForm";
import PaymentsPagePatterns from "@/components/global/patterns/PaymentsPagePatterns";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "@/context/PageFieldsProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LaptopIcon, MobileIcon } from "@radix-ui/react-icons";
import { TPagePrice } from "@/lib/types/index.type";
import { pageThemeProvider } from "@/lib/constants/index.constant";
import { useSearchParams } from "next/navigation";
import { getLsItem } from "@/lib/utils/storage/localstorage";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import { PreviewBoxDesktop, PreviewBoxMobile, PreviewCont } from "@/components/dashboard-layout/pageCreation/PageEditorComponents";
import { PageCont } from "@/components/dashboard-layout/PaymentPageView/PageViewComponents";

/**
 * Page creator and editor main component
 * @param param0
 * @returns
 */
const PageEditor = ({ params }: { params: { ["page-type"]: string } }) => {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const fieldValue = getLsItem("fieldValue");

  const color = fieldValue?.color?.hex;
  const theme = fieldValue?.template;

  const pagePrice: TPagePrice = {
    offerDiscountedPrice: fieldValue?.offerDiscountedPrice,
    price: fieldValue?.price,
    discountedPrice: fieldValue?.discountedPrice,
    priceType: fieldValue?.priceType,
    baseAuctionPrice: fieldValue?.baseAuctionPrice,
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (mode === "preview") {
    return (
      <>
        {isMounted ? (
          <PageCont
            color={color}
            fieldValue={fieldValue}
            theme={theme}
            mode={mode}
            pagePrice={pagePrice}
          >
            <PreviewCont fieldValue={fieldValue} mode={mode} />
          </PageCont>
        ) : (
          <PageSpinner />
        )}
      </>
    );
  }

  return (
    <div className="lg:flex items-start justify-center bg-background min-h-screen">
      <div className="px-5 py-5 bg-card min-h-screen" style={{ flex: ".5" }}>
        <PageTabs pageId={params["page-type"]} />
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
            <TabsTrigger value="mobile">
              <MobileIcon className="h-6" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="desktop">
            <PreviewBoxDesktop />
          </TabsContent>
          <TabsContent value="mobile">
            <PreviewBoxMobile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PageEditor;
