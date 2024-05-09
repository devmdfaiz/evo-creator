"use client";
import AuthWrapper from "@/components/global/auth/AuthWrapper";

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
import { useRouter } from "next/navigation";
import PolicyMsg from "@/components/auth-layout/PolicyMsg";
import SeparatorAuth from "@/components/auth-layout/SeparatorAuth";
import GoogleAuthButton from "@/components/auth-layout/GoogleAuthButton";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import ErrorAlert from "@/components/global/form/ErrorAlert";
import { formSchemaSignUp } from "@/lib/zod/index.zodSchema";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";

// React conponent startss here
const SignUpPage = () => {
  const rout = useRouter();
  const [isError, setIsError] = useState<string>("");
  const [signupStatus, setSignupStatus] = useState<
    "started" | "creating" | "redirecting"
  >("started");

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchemaSignUp>) {
    setSignupStatus("creating");

    toast
      .promise(axios.post("/api/user/signup", values), {
        pending: "Signing you up...",
        success: "Signed up successfully!",
        error: "Failed to sign up. Please try again.",
      })
      .then((res) => {
        const {
          status,
          data: { message, user },
        } = res;

        if (status === 201) {
          const payload = user;

          signIn("credentials", { redirect: false, ...payload });
          setSignupStatus("redirecting");
        }
      })
      .catch((error) => {
        setSignupStatus("started");
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
  }

  useEffect(() => {
    if (signupStatus === "redirecting") {
      toast.info("Redirection to verification page");
      rout.push("/sign-up/verify");
    }
  }, [signupStatus]);

  const form = useForm<z.infer<typeof formSchemaSignUp>>({
    resolver: zodResolver(formSchemaSignUp),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  return (
    <AuthWrapper
      title="Ready to take the next step?"
      subTitle="Sign up and take control."
    >
      <div className="text-center mb-3">
        <TypographyH3>It all starts with you!</TypographyH3>
        <TypographyMuted>
          Enter your name, email, phone number and password to become part of
          our growing community.
        </TypographyMuted>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* name field */}
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Md Faizan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="faizan@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          {isError && <ErrorAlert isError={isError} />}
          <Button
            type="submit"
            className={cn("disabled:bg-gray-500 w-full mt-4")}
            disabled={
              signupStatus === "redirecting" || signupStatus === "creating"
            }
          >
            {signupStatus === "started" ? (
              "Next"
            ) : signupStatus === "creating" ? (
              <div className="flex items-center justify-center gap-2">
                <ButtonSpinner className="w-6 h-6" /> Creating user
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                {" "}
                <ButtonSpinner className="w-6 h-6" /> Redirecting to
                verification page
              </div>
            )}
          </Button>
          <div>
            <TypographySmall>
              Already have account?{" "}
              <Link href="/sign-in" className="text-blue-600">
                Sign in here
              </Link>
            </TypographySmall>
          </div>
        </form>
      </Form>
      <SeparatorAuth />
      <GoogleAuthButton />
      <PolicyMsg />
    </AuthWrapper>
  );
};

export default SignUpPage;
