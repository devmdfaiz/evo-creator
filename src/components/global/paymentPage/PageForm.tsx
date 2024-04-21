"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import TypographyH4 from "@/components/typography/TypographyH4";
import TypographyMuted from "@/components/typography/TypographyMuted";
import TypographyP from "@/components/typography/TypographyP";
import ErrorAlert from "../form/ErrorAlert";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { icons } from "../../../../public/index.icons";
import {
  TPriceBreakdownFixed,
  TPageInputs,
  TPriceBreakdownAuction,
  TProductPageForm,
  TProductPageFormMobile,
  TFieldDetails,
  TPagePrice,
} from "@/lib/types/index.type";
import {
  pageInputBackgroundThemeProvider,
  pageInputThemeProvider,
  pageStrikeTextThemeProvider,
  pageThemeProvider,
} from "@/lib/constants/index.constant";
import { actionOrderFilledInfo } from "@/lib/actions";
import axios from "axios";
import { ReactHookFormContext } from "@/context/ReactHookFormProvider";
import { useContext, useState } from "react";
import { evar } from "@/lib/envConstant";

/**
 * Function that handle customer info which is collected form payment page. This info will transferred to database via server action
 * @location /components/global/paymentPage/PageForm.tsx
 * @param data
 */
const handleOrderFilledInfo: any = async (
  data: TFieldDetails[],
  pageId: string,
  device: string,
  priceType: string
) => {
  console.log("forms data", data, "page Id", pageId);
  // actionOrderFilledInfo(data, pageId, device, priceType);
  const {
    data: { order, msg, status },
  } = await axios.post("/api/order", {
    data,
    pageId,
    device,
    priceType,
  });

  if (status === 200) {
    const options = {
      key: evar.razorpayKey,
      amount: order.amount * 100,
      currency: "INR",
      name: "The Dream Project",
      description: "Product/Service Purchase",
      image: "/next.svg",
      order_id: order.rzrPayOrderId,
      handler: async (response: any) => {
        console.log("response ", response);

        const { data } = await axios.post(
          "/api/razorpay/payment/verify",
          response
        );

        if (data.isSignatureVerified) {
          window.location.href = `/thank-you?order-id=${order.rzrPayOrderId}`;
        } else {
          console.error("Payment verification failed:", data.msg);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }
};

/**
 * This function is contains input fields for page.
 * @location components/paymentPage/PageForm.tsx
 * @returns
 */
export const ProductPageForm = ({
  fieldsData,
  priceDetails,
  color,
  theme,
  className,
}: TProductPageForm) => {
  const path = usePathname();

  const pageId = path.split("/")[2];

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useContext(ReactHookFormContext);

  const priceType: string = priceDetails?.priceType;

  const pageInputBackgroundTheme = pageInputBackgroundThemeProvider(theme);

  return (
    <div
      className={cn(
        `${pageInputBackgroundTheme} absolute xl:w-[417px] lg:w-[350px] right-[9%] top-12 shadow-md p-4 rounded-md border z-[9] hidden lg:block space-y-4`,
        className
      )}
    >
      <TypographyH4 className="mb-3">Payment Details</TypographyH4>
      <form
        onSubmit={handleSubmit((data: any) =>
          handleOrderFilledInfo(data, pageId, "desktop", priceType)
        )}
        className="space-y-4"
      >
        <PageInputs
          fieldsData={fieldsData}
          color={color}
          theme={theme}
          register={register}
          errors={errors}
        />
        {priceDetails?.priceType === "fixedPrice" && (
          <PriceBreakdownFixed priceDetails={priceDetails} theme={theme} />
        )}

        {priceDetails?.priceType === "auctionPrice" && (
          <PriceBreakdownAuction
            priceDetails={priceDetails}
            theme={theme}
            color={color}
          />
        )}

        <Button style={{ backgroundColor: color }} className="w-full">
          Place order
        </Button>
      </form>
      <GuaranteedBar theme={theme} />
    </div>
  );
};

/**
 * This function is contains input fields for page.
 * @location components/paymentPage/PageForm.tsx
 * @returns
 */
export const PageInputs = ({ fieldsData, color, theme }: TPageInputs) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useContext(ReactHookFormContext);

  const pageInputTheme = pageInputThemeProvider(theme);

  return (
    <div className="space-y-4">
      {fieldsData?.map((fieldD: any, i: number) => (
        <div key={i}>
          <Input
            className={`focus-visible:ring-1 focus-visible:ring-[${color}] border ${pageInputTheme}`}
            {...register(fieldD?.placeholder, {
              required: fieldD?.required,
            })}
            type={fieldD?.type.split("-")[0]}
            placeholder={`${fieldD?.placeholder} ${
              fieldD?.required ? "*" : ""
            }`}
          />
          {errors[fieldD?.placeholder] && (
            <ErrorAlert isError={`${fieldD?.placeholder} is required`} />
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * This function is contains input fields for mobile of page.
 * @location components/paymentPage/PageForm.tsx
 * @returns
 */
export const ProductPageFormMobile = ({
  priceDetails,
  color,
  theme,
  className,
  action,
}: TProductPageFormMobile) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useContext(ReactHookFormContext);
  const path = usePathname();
  const rout = useRouter();

  const pageId = path.split("/")[2];

  const themeClass = pageThemeProvider(theme);

  function handleClick() {
    if (action === "Checkout") {
      rout.push(`/pg/${pageId}?checkout=yes`);
    }
  }

  return (
    <div
      className={cn(
        `${themeClass} py-4 px-4 fixed bottom-0 left-0 right-0 lg:hidden w-full`,
        className
      )}
    >
      {priceDetails?.priceType === "fixedPrice" && (
        <PriceBreakdownFixed priceDetails={priceDetails} theme={theme} />
      )}

      {priceDetails?.priceType === "auctionPrice" && (
        <PriceBreakdownAuction
          priceDetails={priceDetails}
          theme={theme}
          color={color}
          action={action}
        />
      )}
      <Button
        onClick={handleClick}
        style={{ backgroundColor: color }}
        className="bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 px-4 w-full mt-2"
      >
        {action}
      </Button>
    </div>
  );
};

/**
 * This function is contains price details for fixed of page.
 * @location components/paymentPage/PageForm.tsx
 * @returns
 */
export const PriceBreakdownFixed = ({
  priceDetails,
  theme,
}: TPriceBreakdownFixed) => {
  function calculateDiscountPercentage(
    regularPrice: number,
    discountedPrice: number
  ) {
    // Check for invalid inputs (prices must be positive numbers)
    if (regularPrice <= 0 || discountedPrice <= 0) {
      return "Invalid prices. Prices must be positive numbers.";
    }

    const discountAmount = regularPrice - discountedPrice;
    const discount = discountAmount / regularPrice;
    const discountPercentage = (discount * 100).toFixed(2);

    return discountPercentage + "% off";
  }

  const pageStrikeTextTheme = pageStrikeTextThemeProvider(theme);

  return (
    <div className="space-y-1">
      <TypographyMuted>Amount total</TypographyMuted>
      <TypographyP>
        <span className="text-sm font-semibold">
          {priceDetails?.offerDiscountedPrice
            ? `₹${priceDetails?.discountedPrice}`
            : `₹${priceDetails?.price}`}
        </span>{" "}
        {priceDetails?.offerDiscountedPrice && (
          <span className={`text-sm line-through ${pageStrikeTextTheme}`}>
            {`₹${priceDetails?.price}`}
          </span>
        )}{" "}
        {priceDetails?.offerDiscountedPrice && (
          <span className="text-sm text-green-700">
            {calculateDiscountPercentage(
              priceDetails?.price,
              priceDetails?.discountedPrice
            )}
          </span>
        )}
      </TypographyP>
    </div>
  );
};

/**
 * This function is contains price details for auction of page.
 * @location components/paymentPage/PageForm.tsx
 * @returns
 */
export const PriceBreakdownAuction = ({
  priceDetails,
  theme,
  color,
  action,
}: TPriceBreakdownAuction) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useContext(ReactHookFormContext);

  const searchParams = useSearchParams();
  const isCheckout = searchParams.get("checkout");

  const pageInputTheme = pageInputThemeProvider(theme);

  return (
    <div className="space-y-1">
      <TypographyP>Amount Details</TypographyP>
      {priceDetails?.baseAuctionPrice && (
        <>
          <Label
            className="text-black/70"
            htmlFor="actionPrice"
          >{`Minimum allowed ₹${priceDetails?.baseAuctionPrice}`}</Label>
          {!action || action !== "Checkout" ? (
            <Input
              className={`focus-visible:ring-1 focus-visible:ring-[${color}] border ${pageInputTheme}`}
              {...register("auctionPrice", {
                required: true,
              })}
              type="number"
              id="auctionPrice"
              placeholder={`eg: ${
                parseInt(priceDetails?.baseAuctionPrice) + 200
              }`}
            />
          ) : (
            ""
          )}
          {action !== "Checkout" && errors.auctionPrice && (
            <ErrorAlert isError={`Price is required`} />
          )}
        </>
      )}
    </div>
  );
};

/**
 * This function is contains guarantee batches of page.
 * @location components/paymentPage/PageForm.tsx
 * @returns
 */
export const GuaranteedBar = ({ theme }: { theme: string }) => {
  return (
    <div
      className={`rounded-md p-3 flex flex-col gap-3 items-center justify-center ${
        theme === "dark" ? "bg-white/10" : "bg-slate-400/20"
      }`}
    >
      <p className="text-sm">Guaranteed safe & secure payment</p>
      <div className="flex justify-center flex-wrap gap-2">
        <Image src={icons.visa} width={30} height={30} alt="visa" />

        <Image src={icons.mastercard} width={30} height={30} alt="mastercard" />

        <Image src={icons.gpay} width={30} height={30} alt="gpay" />

        <Image src={icons.paytm} width={30} height={30} alt="paytm" />

        <Image src={icons.phonePe} width={30} height={30} alt="phonePe" />

        <Image src={icons.upi} width={30} height={30} alt="upi" />
      </div>
    </div>
  );
};

export const PageInputsWithFormForMobileFormSolution = ({
  fieldsData,
  color,
  theme,
  priceDetails,
  action,
}: {
  fieldsData: TFieldDetails[];
  color: string;
  theme: string;
  priceDetails: TPagePrice;
  action: string;
}) => {
  const path = usePathname();
  const pageId = path.split("/")[2];

  const priceType: string = priceDetails?.priceType;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useContext(ReactHookFormContext);

  return (
    <div className="px-5 py-7">
      <TypographyH4 className="mb-3">Payment Details</TypographyH4>
      <form
        onSubmit={handleSubmit((data: any) =>
          handleOrderFilledInfo(data, pageId, "tablet/mobile", priceType)
        )}
        className="space-y-3"
      >
        <PageInputs
          color={color}
          errors={errors}
          fieldsData={fieldsData}
          register={register}
          theme={theme}
        />
        <ProductPageFormMobile
          priceDetails={priceDetails}
          color={color}
          theme={theme}
          action={action}
        />
      </form>
    </div>
  );
};
