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
import { redirect, useRouter } from "next/navigation";
import PolicyMsg from "@/components/auth-layout/PolicyMsg";
import SeparatorAuth from "@/components/auth-layout/SeparatorAuth";
import GoogleAuthButton from "@/components/auth-layout/GoogleAuthButton";
import { checkCredentials } from "@/lib/actions";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import ErrorAlert from "@/components/global/form/ErrorAlert";

export const formSchemaLogin = z.object({
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digit",
    })
    .max(10, {
      message: "Phone number must be contain 10 digit",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(16, {
      message: "Password max contain 16 characters",
    }),
});

let isLoginCom = false;

// react components starts here
const SignInPage = () => {
  const rout = useRouter();
  const [isError, setIsError] = useState<any>("");

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchemaLogin>) {
    const { phone, password } = values;
    checkCredentials(phone, password).then((res) => {
      if (res?.status) {
        const payload = res?.payload;
        signIn("credentials", { redirect: false, ...payload });
        isLoginCom = true;
      } else {
        console.log("error in sign in", res?.massage);
        setIsError(res?.massage);
      }
    });
  }

  // handle seaving phone number in local storage and redirect to OTP verification page
  if (isLoginCom) {
    rout.push("/");
    setTimeout(() => {
      rout.refresh();
    }, 500);
  }

  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

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
          {isError && <ErrorAlert isError={isError} />}
          <Button
            type="submit"
            className={cn("disabled:bg-gray-500 w-full mt-4")}
            disabled={form.formState.isSubmitting}
          >
            Next
          </Button>
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
      <SeparatorAuth />
      <GoogleAuthButton />
      <PolicyMsg />
    </AuthWrapper>
  );
};

export default SignInPage;
