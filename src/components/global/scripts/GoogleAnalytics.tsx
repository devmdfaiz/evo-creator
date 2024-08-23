"use client";
import Script from "next/script";

const GoogleAnalytics = ({ gaTrackingId }: { gaTrackingId: string }) => (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
      id="gaScript"
    />
    <Script
      id="gaScript2"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaTrackingId}', {
            page_path: window.location.pathname,
          });
        `,
      }}
    />
  </>
);

export default GoogleAnalytics;
