"use client";
import AuthWrapper from "@/components/global/auth/AuthWrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TypographyH3 from "@/components/typography/TypographyH3";
import TypographyMuted from "@/components/typography/TypographyMuted";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast as reactToastify } from "react-toastify";
import toast from "react-hot-toast";
import ErrorAlert from "../form/ErrorAlert";
import ButtonSpinner from "../spinner/ButtonSpinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils/utils";
import { addMinutes, intervalToDuration } from "date-fns";
import {
  getLsItem,
  removeLsItem,
  setLsItem,
} from "@/lib/utils/storage/localstorage";
import { clientError } from "@/lib/utils/error/errorExtractor";

const formSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "OTP must be at least 6 digit",
    })
    .max(6, {
      message: "OTP must be contain 6 digit",
    }),
});

const OTPCountdownTimmer = ({ onComplete, setIsError }: any) => {
  const [timmerInterval, setTimmerInterval] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [isTimmerCompleted, setIsTimmerCompleted] = useState(false);

  useEffect(() => {
    const otpTimmerFinalDate: string = getLsItem("otpTimmerFinalDate");

    if (timmerInterval) {
      if (
        (timmerInterval.minutes <= 0 && timmerInterval.hours <= 0,
        timmerInterval.seconds <= 0)
      ) {
        setIsTimmerCompleted(true);
      }
    }

    setTimmerInterval(
      intervalToDuration({
        start: new Date(),
        end: new Date(otpTimmerFinalDate),
      })
    );
  }, [timmerInterval]);

  useEffect(() => {
    const otpTimmerFinalDate: string = getLsItem("otpTimmerFinalDate");
    setIsClient(true);
    if (timmerInterval) {
      if (
        (timmerInterval.minutes <= 0 && timmerInterval.hours <= 0,
        timmerInterval.seconds <= 0)
      ) {
        removeLsItem("otpTimmerFinalDate");
        setIsTimmerCompleted(true);
      }
    }

    if (!otpTimmerFinalDate) {
      setLsItem("otpTimmerFinalDate", addMinutes(new Date(), 3));

      setTimmerInterval(
        intervalToDuration({
          start: new Date(),
          end: new Date(otpTimmerFinalDate),
        })
      );
    }
  }, []);

  return (
    <>
      {isClient &&
        (isTimmerCompleted ? (
          <Button
            className="mt-2 p-0"
            onClick={async () => {
              toast
                .promise(axios.get("/api/emails/otp/send-otp"), {
                  loading: "Generating OTP...",
                  success: "OTP generated successfully!",
                  error: "Failed to generating OTP. Please try again.",
                })
                .then(() => {
                  setLsItem("otpTimmerFinalDate", addMinutes(new Date(), 3));

                  setTimeout(() => {
                    const otpTimmerFinalDate: string =
                      getLsItem("otpTimmerFinalDate");

                    setTimmerInterval(
                      intervalToDuration({
                        start: new Date(),
                        end: new Date(otpTimmerFinalDate),
                      })
                    );

                    setIsTimmerCompleted(false);
                  }, 500);
                })
                .catch((error) => {
                  let errorMessage = "An unexpected error occurred.";

                  if (
                    error &&
                    typeof error === "object" &&
                    "response" in error &&
                    (error as any).response?.data?.message
                  ) {
                    // Check if the error has a response with a data object containing the message
                    errorMessage = (error as any).response.data.message;
                  }

                  setIsError(errorMessage); // Set the extracted message as the error state
                });
            }}
            variant="link"
          >
            Request new OTP
          </Button>
        ) : (
          <div className="my-2">
            Request new OTP in:{" "}
            <span className="text-primary">
              {!timmerInterval?.hours
                ? "00"
                : (timmerInterval?.hours).length === 1
                ? `0${timmerInterval?.hours}`
                : timmerInterval?.hours}
              :
              {!timmerInterval?.minutes
                ? "00"
                : (timmerInterval?.minutes).length === 1
                ? `0${timmerInterval?.minutes}`
                : timmerInterval?.minutes}
              :
              {!timmerInterval?.seconds
                ? "00"
                : (timmerInterval?.seconds).length === 1
                ? `0${timmerInterval?.seconds}`
                : timmerInterval?.seconds}
            </span>
          </div>
        ))}
    </>
  );
};

// react components starts here
const OtpVerificationCom = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  const rout = useRouter();
  const [emailVerificationStatus, setEmailVerificationStatus] = useState<
    "started" | "verifying" | "redirecting"
  >("started");
  const [isError, setIsError] = useState<string>("");
  const session = useSession();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setEmailVerificationStatus("verifying");

    toast
      .promise(axios.post("/api/emails/otp/verify-otp", values), {
        loading: "Verifying OTP...",
        success: "OTP verified",
        error: "Invalid OTP!",
      })
      .then((res) => {
        const {
          status,
          data: { isOtpValid, user, message },
        } = res;

        if (status === 200 && isOtpValid) {
          const payload = user;

          console.log("payload", payload);

          signIn("credentials", { redirect: false, ...payload })
            .then(() => {
              toast.success("Redirecting to dashboard");
              setEmailVerificationStatus("redirecting");
              // Refresh the session after signIn
              window.location.reload();
            })
            .catch((error) => {
              setEmailVerificationStatus("started");
              const errorMessage = clientError(error);

              setIsError(errorMessage); // Set the extracted message as the error state
            });
          return;
        }

        if (status !== 200 && !isOtpValid) {
          setEmailVerificationStatus("started");
          setIsError(message);
        }

        setIsError(message);
      })
      .catch((error) => {
        setEmailVerificationStatus("started");
        const errorMessage = clientError(error);

        setIsError(errorMessage); // Set the extracted message as the error state
      });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  function handleTimerComplete() {}

  return (
    <AuthWrapper
      title="Top secret alert!"
      subTitle="We've sent a secret code to your phone. Enter it here to join the mission."
    >
      <div className="text-center mb-3">
        <TypographyH3>{"Unlock the door!"}</TypographyH3>
        <TypographyMuted>
          {
            "We've sent a key to your email (virtually, of course). Enter it here to get verified."
          }
        </TypographyMuted>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* otp field */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem
                className={cn(
                  "w-full flex flex-col justify-center items-center"
                )}
              >
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="text-center">
                  Please enter the one-time password sent to your email.{" "}
                  <b>{session?.data?.user?.email}</b>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {isError && <ErrorAlert isError={isError} setIsError={setIsError} />}
          {emailVerificationStatus === "started" ? (
            <Button
              type="submit"
              className={cn("disabled:bg-gray-500 w-full mt-4 py-1")}
            >
              Verify OTP
            </Button>
          ) : emailVerificationStatus === "verifying" ? (
            <div className="flex items-center justify-center gap-2 py-1">
              <ButtonSpinner className="w-5 h-5" /> Verifying OTP!
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 py-1">
              {" "}
              <ButtonSpinner className="w-5 h-5" /> Redirecting to dashboard!
            </div>
          )}
        </form>
      </Form>

      <OTPCountdownTimmer
        onComplete={handleTimerComplete}
        setIsError={setIsError}
      />
    </AuthWrapper>
  );
};

export default OtpVerificationCom;
