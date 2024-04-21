import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/context/NextAuthSessionProvider";
import ProgressBarProvider from "@/context/ProgressBarProvider";
import { Toaster } from "@/components/ui/sonner";
import PageFieldsProvider from "@/context/PageFieldsProvider";
import  ReactHookFormProvider from "@/context/ReactHookFormProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} debug-screens`}>
        <ProgressBarProvider>
          <NextAuthSessionProvider>
            <PageFieldsProvider>
              <ReactHookFormProvider>
                <main className="min-h-screen">{children}</main>
                <Toaster />
              </ReactHookFormProvider>
            </PageFieldsProvider>
          </NextAuthSessionProvider>
        </ProgressBarProvider>

        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </body>
    </html>
  );
}
