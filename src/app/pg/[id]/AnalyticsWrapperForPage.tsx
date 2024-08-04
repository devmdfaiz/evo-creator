"use client";
import GoogleAnalytics from "@/components/global/scripts/GoogleAnalytics";
import PixelBaseCode from "@/components/global/scripts/PixelBaseCode";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

const AnalyticsWrapperForPage = ({
  pixelId,
  gaTrackingId,
  children,
}: {
  pixelId: string;
  gaTrackingId: string;
  children: ReactNode;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useMemo(() => {
    if (isMounted) {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Payment Page View");
        window.gtag("event", "Payment Page View");
      } else {
        console.error("Facebook Pixel is not initialized.");
      }

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "payment_page_iew");
      } else {
        console.error("Google analytics is not initialized.");
      }
    }
  }, [isMounted]);

  return (
    <>
      {" "}
      {pixelId && <PixelBaseCode pixelId={pixelId} />}
      {gaTrackingId && <GoogleAnalytics gaTrackingId={gaTrackingId} />}
      {children}
    </>
  );
};

export default AnalyticsWrapperForPage;
