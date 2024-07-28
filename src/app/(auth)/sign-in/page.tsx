"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/utils";
import TypographyH3 from "@/components/typography/TypographyH3";
import TypographyMuted from "@/components/typography/TypographyMuted";
import TypographySmall from "@/components/typography/TypographySmall";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PolicyMsg from "@/components/auth-components/PolicyMsg";
import SeparatorAuth from "@/components/auth-components/SeparatorAuth";
import GoogleAuthButton from "@/components/auth-components/GoogleAuthButton";
import { signIn } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import ErrorAlert from "@/components/global/form/ErrorAlert";
import axios from "axios";
import { toast as reactToastify } from "react-toastify";
import toast from "react-hot-toast";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import {
  formSchemaForgotPassword,
  formSchemaLogin,
} from "@/lib/zod/index.zodSchema";
import { clientError } from "@/lib/utils/error/errorExtractor";
import AuthWrapper from "@/components/auth-components/AuthWrapper";
import OtpVerificationCom from "@/components/global/auth/OtpVerification";

// react components starts here
const SignIn = () => {
  const rout = useRouter();
  const [isError, setIsError] = useState<any>("");
  const [signinStatus, setSigninStatus] = useState<
    "started" | "verifying" | "redirecting"
  >("started");

  const searchParams = useSearchParams();
  const isVerify = searchParams.get("verify");
  const isForgot = searchParams.get("forgot");

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchemaLogin>) {
    setSigninStatus("verifying");

    toast
      .promise(axios.post("/api/user/signin", values), {
        loading: "Signing you up...",
        success: "Signed up successfully!",
        error: "Failed to sign in. Please try again.",
      })
      .then((res) => {
        const {
          status,
          data: { message, user },
        } = res;

        if (status === 200) {
          const payload = user;

          signIn("credentials", {
            redirect: false,
            ...payload,
            ...payload.avatar,
          })
            .then(() => {
              toast.success("Redirecting to verification page");
              setSigninStatus("redirecting");
            })
            .catch((error) => {
              setSigninStatus("started");
              const errorMessage = clientError(error);

              setIsError(errorMessage); // Set the extracted message as the error state
            });

          return;
        }
        setSigninStatus("started");
      })
      .catch((error) => {
        setSigninStatus("started");
        const errorMessage = clientError(error);

        setIsError(errorMessage); // Set the extracted message as the error state
      })
      .finally(() => {
        setSigninStatus("started");
      });
  }

  useEffect(() => {
    if (signinStatus === "redirecting") {
      toast.success("Redirection to verification page");
      rout.push("/sign-in?verify=true");
      setSigninStatus("started");
    }
  }, [signinStatus]);

  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  if (isVerify) {
    return (
      <OtpVerificationCom
        title="Unlock the door!"
        subTitle="We've sent a key to your phone (virtually, of course). Enter it here to open your account."
      />
    );
  }

  if (isForgot) {
    return <ForgotPasswordInput />;
  }

  return (
    <AuthWrapper
      title="Time to pick up where you left off!"
      subTitle="Sign in and continue your adventure."
    >
      <div className="text-center mb-3">
        <TypographyH3>Missing you!</TypographyH3>
        <TypographyMuted>
          {"Enter your phone number and password so we can connect again."}
        </TypographyMuted>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* phone field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="F$%$N6573n#6y" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href="/sign-in?forgot=true"
            className="text-primary text-sm my-2 hover:underline"
          >
            Forgot password?
          </Link>

          {isError && <ErrorAlert isError={isError} setIsError={setIsError} />}
          {signinStatus === "started" ? (
            <Button
              type="submit"
              className={cn("disabled:bg-gray-500 w-full mt-4 py-1")}
            >
              Next
            </Button>
          ) : signinStatus === "verifying" ? (
            <div className="flex items-center justify-center gap-2 py-1">
              <ButtonSpinner className="w-5 h-5" /> Verifying credential!
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 py-1">
              {" "}
              <ButtonSpinner className="w-5 h-5" /> Redirecting to verification
              page!
            </div>
          )}
          <div>
            <TypographySmall>
              Have no account?{" "}
              <Link href="/sign-up" className="text-blue-600">
                Sign up here
              </Link>
            </TypographySmall>
          </div>
        </form>
      </Form>
      {/* <SeparatorAuth />
      <GoogleAuthButton /> */}
    </AuthWrapper>
  );
};

function ForgotPasswordInput() {
  const rout = useRouter();
  const [isError, setIsError] = useState<any>("");
  const [forgotPassPhoneInputStatus, setForgotPassPhoneInputStatus] = useState<
    "started" | "verifying" | "sended"
  >("started");
  const [userEmail, setUserEmail] = useState("");

  const form = useForm<z.infer<typeof formSchemaForgotPassword>>({
    resolver: zodResolver(formSchemaForgotPassword),
    defaultValues: {
      phone: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchemaForgotPassword>) {
    setForgotPassPhoneInputStatus("verifying");

    toast
      .promise(axios.post("/api/user/signin/forgot-password", values), {
        loading: "Verifying phone number...",
        success: "Phone number verified and OTP send successfully!",
        error: "Failed to verify phone number. Please try again.",
      })
      .then((res) => {
        const {
          status,
          data: { message, user },
        } = res;

        if (status === 200) {
          setForgotPassPhoneInputStatus("sended");
          setUserEmail(user);
          return;
        }
        setForgotPassPhoneInputStatus("started");
      })
      .catch((error) => {
        setForgotPassPhoneInputStatus("started");
        const errorMessage = clientError(error);

        setIsError(errorMessage); // Set the extracted message as the error state
      });
  }

  return (
    <AuthWrapper
      title="Time to pick up where you left off!"
      subTitle="Sign in and continue your adventure."
    >
      {forgotPassPhoneInputStatus === "sended" ? (
        <TypographySmall>
          A password reset link has been sent to your email address:{" "}
          <b>{userEmail}</b>. Please check your inbox and follow the
          instructions in the email to reset your password. If you do not see
          the email, be sure to check your spam or junk folder.
        </TypographySmall>
      ) : (
        <>
          <div className="text-center mb-3">
            <TypographyH3>Reset Your Password</TypographyH3>
            <TypographyMuted>
              {
                "Please enter your registered phone number to reset your password. We will send you a verification code."
              }
            </TypographyMuted>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              {/* phone field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                href="/sign-in"
                className="text-primary text-sm my-2 hover:underline flex items-center justify-start"
              >
                <ChevronLeftIcon /> Back
              </Link>

              {isError && (
                <ErrorAlert isError={isError} setIsError={setIsError} />
              )}
              {forgotPassPhoneInputStatus === "started" ? (
                <Button
                  type="submit"
                  className={cn("disabled:bg-gray-500 w-full mt-4 py-1")}
                >
                  Request OTP
                </Button>
              ) : forgotPassPhoneInputStatus === "verifying" ? (
                <div className="flex items-center justify-center gap-2 py-1">
                  <ButtonSpinner className="w-5 h-5" /> Verifying credential!
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 py-1">
                  {" "}
                  <ButtonSpinner className="w-5 h-5" /> Redirecting to
                  verification page!
                </div>
              )}
              <div>
                <TypographySmall>
                  Have no account?{" "}
                  <Link href="/sign-up" className="text-blue-600">
                    Sign up here
                  </Link>
                </TypographySmall>
              </div>
            </form>
          </Form>
        </>
      )}
    </AuthWrapper>
  );
}

const SignInPage = () => {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
};

export default SignInPage;
