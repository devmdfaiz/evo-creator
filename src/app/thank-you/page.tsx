"use client";
import GoogleAnalytics from "@/components/global/scripts/GoogleAnalytics";
import PixelBaseCode from "@/components/global/scripts/PixelBaseCode";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import { Button } from "@/components/ui/button";
import { evar } from "@/lib/envConstant";
import { checkOrderPaidOrNot } from "@/lib/fetch/fetch";
import { redirectToLink } from "@/lib/utils/utils";
import { format } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode, Suspense, useEffect, useMemo, useState } from "react";

const ThankYouPage = ({
  paymentStatus,
  orderData,
  isMounted,
}: {
  paymentStatus: "verifying" | "paid" | "unpaid" | "error";
  orderData: any[];
  isMounted: boolean;
}) => {
  useEffect(() => {
    if (paymentStatus === "paid" && isMounted) {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Purchase", {
          transaction_id: orderData[0].orderId,
          price: orderData[0].amount,
          currency: "INR",
          item: {
            item_name: orderData[0].pageTitle,
            item_id: orderData[0].pageId,
            price: orderData[0].amount,
            quantity: 1,
          },
        });
        if (
          typeof window !== "undefined" &&
          window.gtag &&
          typeof window.gtag !== "undefined"
        ) {
          window.gtag("event", "purchase", {
            transaction_id: orderData[0].orderId,
            price: orderData[0].amount,
            currency: "INR",
            item: {
              item_name: orderData[0].pageTitle,
              item_id: orderData[0].pageId,
              price: orderData[0].amount,
              quantity: 1,
            },
          });
        }
      } else {
        console.error("Facebook Pixel is not initialized.");
      }
    }
  }, [paymentStatus, isMounted, orderData]);

  const reloadPage = () => {
    window.location.reload();
  };

  if (paymentStatus === "verifying") {
    return <PageSpinner className="pt-[50vh]" />;
  }

  if (paymentStatus === "error") {
    return (
      <div className="bg-gray-100">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-red-600">
                Error Fetching Order Data
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                There was an error fetching your order data. Please try again.
              </p>
              <div className="mt-4">
                <button
                  onClick={reloadPage}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const thankYouNote = orderData[0]?.thankYouNote;

  return (
    <ThankYouPageWrapper>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {paymentStatus === "paid" && (
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Thank You for Your Purchase!
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {thankYouNote
                ? thankYouNote
                : "Your order is confirmed and your digital product is ready for download."}
            </p>
          </div>
        )}

        {/* Product Section */}
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Product Title
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {orderData[0].pageTitle}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {orderData[0].pageDesc}
              </dd>
            </div>
          </dl>
        </div>

        {/* Order Details Section */}
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Order Id</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {orderData[0].orderId}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Order Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {format(orderData[0].createdAt, "dd-MMMM-yyyy")}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Total Amount
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                ₹{orderData[0].amount}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Download Section */}
      {paymentStatus === "paid" && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-10">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Download Your Product
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Click the button below to download your digital product. You will
              also receive an email with the download link.
            </p>
            <div className="mt-4">
              <Button
                style={{ backgroundColor: orderData[0].color }}
                onClick={() => {
                  redirectToLink(orderData[0].downloadableFile, "_blank");
                }}
              >
                Download Now
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              If you lose the email, create an account on {evar.projectName}{" "}
              with the same phone number used to purchase, and you can download
              your product again.
            </p>
          </div>
        </div>
      )}

      {/* Unpaid Order Section  */}
      {paymentStatus === "unpaid" && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-10">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-red-600">
              Your Order is Unpaid
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              It looks like your order is not yet paid. Please complete your
              payment to download the product.
            </p>
            <div className="mt-4">
              <Link
                href={`/pg/${orderData[0].pageId}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Complete Payment
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              If you need assistance with completing your payment, please
              contact our support team.
            </p>
          </div>
        </div>
      )}

      {/* Support Section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-10">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Need Help?
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            If you have any questions or need assistance, our support team is
            here to help. Please {"don't"} hesitate to reach out to us.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="text-sm text-gray-600">
              <strong>Email:</strong> {evar.supportEmail}
            </li>
            <li className="text-sm text-gray-600">
              <strong>Phone:</strong> {evar.supportPhone}
            </li>
          </ul>
        </div>
      </div>

      {/* Explore More Section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-10">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Explore More
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Continue exploring {evar.projectName} and discover more tools and
            features designed to help you succeed.
          </p>
          <div className="mt-4 space-x-4">
            <Link
              href="/overview"
              className="text-indigo-600 hover:text-indigo-900"
            >
              Visit Your Dashboard
            </Link>
            <Link
              href="/pages"
              className="text-indigo-600 hover:text-indigo-900"
            >
              Explore Our Tools
            </Link>
          </div>
        </div>
      </div>
    </ThankYouPageWrapper>
  );
};

const SuspenseThankYouPage = () => {
  const [paymentStatus, setPaymentStatus] = useState<
    "verifying" | "paid" | "unpaid" | "error"
  >("verifying");
  const [orderData, setOrderData] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const searchParams = useSearchParams();
  const orderId = searchParams.get("order-id");

  useMemo(() => {
    checkOrderPaidOrNot(orderId!, setPaymentStatus, setOrderData).finally(
      () => {
        setIsMounted(true);
      }
    );
  }, []);

  const pixelId = orderData[0]?.metaPixel;
  const gaTrackingId = orderData[0]?.gaTrackingId;

  return (
    <Suspense>
      {pixelId && <PixelBaseCode pixelId={pixelId} />}
      {gaTrackingId && <GoogleAnalytics gaTrackingId={gaTrackingId} />}
      <ThankYouPage
        orderData={orderData}
        paymentStatus={paymentStatus}
        isMounted={isMounted}
      />
    </Suspense>
  );
};

const ThankYouPageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        {children}
      </main>
      {/* Footer */}
      <footer className="bg-white shadow mt-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            © 2024 {evar.projectName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SuspenseThankYouPage;
