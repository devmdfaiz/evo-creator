"use client";
import { Button } from "@/components/ui/button";
import TypographyH4 from "@/components/typography/TypographyH4";
import TypographyMuted from "@/components/typography/TypographyMuted";
import TypographyP from "@/components/typography/TypographyP";
import ErrorAlert from "../form/ErrorAlert";
import { cn } from "@/lib/utils/utils";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  TPriceBreakdownFixed,
  TPageInputs,
  TPriceBreakdownAuction,
  TProductPageForm,
  TProductPageFormMobile,
  TPageOrderInputs,
  TPagePrice,
} from "@/lib/types/index.type";
import {
  pageInputBackgroundThemeProvider,
  pageInputThemeProvider,
  pageStrikeTextThemeProvider,
  pageThemeProvider,
} from "@/lib/constants/index.constant";
import axios from "axios";
import { ReactHookFormContext } from "@/context/ReactHookFormProvider";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { toast } from "react-toastify";
import { indianNameAndCityGenerator } from "@/lib/faker/index.faker";
import { useErrorHandler } from "@/context/zustand/store";
import RazorpayIcon from "@/components/icons/RazorpayIcon";
import { useZustandSelector } from "@/context/zustand/slectors";
import spinUpCashfreePaymentPage from "./spinUpPaymentPage";
import { clientError } from "@/lib/utils/error/errorExtractor";
import { showToast } from "@/lib/zod/index.zodSchema";
import ButtonSpinner from "../spinner/ButtonSpinner";
import { Loader } from "lucide-react";

export const randomTimeGenerator = (delayValueArr: number[]) => {
  const delays = delayValueArr; // Array of delay values in milliseconds
  const randomIndex = Math.floor(Math.random() * delays.length); // Get a random index
  const randomDelay = delays[randomIndex]; // Pick a random delay from the array

  return randomDelay;
};

/**
 * Function that handle customer info which is collected form payment page and open payment wizard. This info will transferred to database via api
 * @location /components/global/paymentPage/PageForm.tsx
 * @param info
 */
const handleOrderFilledInfo: any = async (info: {
  data: any;
  pageId: string;
  setIsDetailsSubmitting: Dispatch<SetStateAction<boolean>>;
}) => {
  // Ensure fbq is defined before using it
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", "Initiate Checkout");
  }
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "begin_checkout", {
      event_category: "engagement",
      event_label: "Buy Now Button Click",
    });
  }

  const { setIsDetailsSubmitting } = info;
  setIsDetailsSubmitting(true);

  try {
    const {
      data: { order },
      status,
    } = await axios.post("/api/order", info);

    if (status === 201) {
      setIsDetailsSubmitting(false);
      spinUpCashfreePaymentPage(order);
    }
  } catch (error) {
    setIsDetailsSubmitting(false);
    const errorMessage = clientError(error);
    console.log("payment page opening error is: ", error);
    showToast(errorMessage, null, "Close", () => {});
  }
};

function repeatToast() {
  const name: string = indianNameAndCityGenerator().indianName;
  const city: string = indianNameAndCityGenerator().indianCity;

  const randomDelay = randomTimeGenerator([10, 15, 20, 5]);

  const Msg = () => (
    <>
      <div>
        <span>
          <b>🧔 {name}</b> just bought this product
        </span>{" "}
        <span>
          from <b>{city} 📍</b>
        </span>
      </div>
      <span>{randomDelay}sec ago</span>
    </>
  );

  // setTimeout(() => {
  //   toast(<Msg />, {
  //     position: "bottom-left",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  //   repeatToast(); // Call itself again
  // }, randomDelay * 1000);
}

/**
 * This function is contains input fields for page.
 * @location components/paymentPage/PageForm.tsx
 * @param param0
 * @returns
 */
export const ProductPageForm = ({
  fieldsData,
  priceDetails,
  color,
  theme,
  className,
  buttonText,
}: TProductPageForm) => {
  const path = usePathname();

  const [isDetailsSubmitting, setIsDetailsSubmitting] = useState(false);

  const pageId = path.split("/")[2];

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useContext(ReactHookFormContext);

  const priceType = priceDetails?.priceType;

  repeatToast(); // Start the repetition

  return (
    <div
      className={cn(
        `mt-11 p-4 hidden lg:block space-y-4 rounded-s-[22px] border-s-2`,
        className
      )}
      style={{ borderColor: color }}
    >
      <TypographyH4 className="mb-3">Payment Details</TypographyH4>
      <form
        onSubmit={handleSubmit((data: any) =>
          handleOrderFilledInfo({ data, pageId, setIsDetailsSubmitting })
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

        {!isDetailsSubmitting ? (
          <Button
            style={{ backgroundColor: color }}
            className="w-full py-8 text-base tracking-wider rounded-3xl"
          >
            {buttonText}
          </Button>
        ) : (
          <div className="w-full py-2 flex justify-center items-center">
            <Loader className="animate-spin" />
          </div>
        )}
      </form>

      <GuaranteedBar theme={theme} />
    </div>
  );
};

/**
 * This function is contains input fields for page.
 * @location components/paymentPage/PageForm.tsx
 * @param param0
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

  const errorState = useZustandSelector(useErrorHandler);
  const setIsError = errorState.use.setIsError();

  return (
    <div className="space-y-4">
      {fieldsData?.map((fieldD: any, i: number) => (
        <div key={i} className="space-y-4">
          <Label htmlFor={fieldD?.type} className="mb-2">
            {fieldD?.placeholder}
          </Label>
          <div>
            {" "}
            <input
              id={fieldD?.type}
              className={`${pageInputTheme} py-5 px-6 rounded-3xl w-full text-sm `}
              {...register(fieldD?.placeholder, {
                required: fieldD?.required,
              })}
              type={fieldD?.type.split("-")[0]}
              placeholder={`${fieldD?.placeholder} ${
                fieldD?.required ? "*" : ""
              }`}
            />
          </div>
          {errors[fieldD?.placeholder] && (
            <ErrorAlert
              isError={`${fieldD?.placeholder} is required`}
              setIsError={setIsError}
              className="rounded-3xl"
            />
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
  const path = usePathname();
  const rout = useRouter();

  const pageId = path.split("/")[2];

  const themeClass = pageThemeProvider(theme);

  function handleClick() {
    if (action === "Checkout") {
      rout.push(`/pg/${pageId}?checkout=yes`);
      return;
    }
  }

  return (
    <div
      className={cn(
        `${themeClass} py-4 px-4 fixed bottom-0 left-0 right-0 lg:hidden w-full space-y-3 border-t
        `,
        className
      )}
    >
      <div className="pl-3">
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
      </div>

      <Button
        onClick={handleClick}
        style={{ backgroundColor: color }}
        className="w-full py-5 text-base tracking-wider rounded-3xl"
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
        {priceDetails.offerDiscountedPrice && (
          <span className="text-sm text-green-700">
            {calculateDiscountPercentage(
              priceDetails.price!,
              priceDetails.discountedPrice!
            )}
          </span>
        )}
      </TypographyP>
    </div>
  );
};

/**
 * This function is contains price details for auction of page.
 * @location components/PaymentPage/PageForm.tsx
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

  const errorState = useZustandSelector(useErrorHandler);
  const setIsError = errorState.use.setIsError();

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
            <input
              className={`bg-gray-200/60 py-5 px-6 rounded-3xl w-full text-sm`}
              {...register("auctionPrice", {
                required: true,
              })}
              type="number"
              id="auctionPrice"
              placeholder={`eg: ${JSON.stringify(
                priceDetails?.baseAuctionPrice + 200
              )}`}
            />
          ) : (
            ""
          )}
          {action !== "Checkout" && errors.auctionPrice && (
            <ErrorAlert
              isError={`Price is required`}
              setIsError={setIsError}
              className=""
            />
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
    <div className="flex gap-1 items-center justify-center">
      <TypographyP>Powered & Secured by</TypographyP>
      <RazorpayIcon />
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
  fieldsData: TPageOrderInputs[];
  color: string;
  theme: string;
  priceDetails: TPagePrice;
  action: string;
}) => {
  const path = usePathname();
  const pageId = path.split("/")[2];

  const priceType = priceDetails.priceType;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useContext(ReactHookFormContext);

  return (
    <form
      onSubmit={handleSubmit((data: any) =>
        handleOrderFilledInfo({ data, pageId, priceType })
      )}
      className="px-5 py-7"
    >
      <TypographyH4 className="mb-3">Payment Details</TypographyH4>

      <div>
        <div className="pb-36">
          <PageInputs
            color={color}
            errors={errors}
            fieldsData={fieldsData}
            register={register}
            theme={theme}
          />
        </div>

        <div>
          <ProductPageFormMobile
            priceDetails={priceDetails}
            color={color}
            theme={theme}
            action={action}
          />
        </div>
      </div>
    </form>
  );
};
