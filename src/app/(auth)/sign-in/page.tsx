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
import { useState } from "react";
import ErrorAlert from "@/components/global/form/ErrorAlert";
import { formSchemaLogin } from "@/lib/zod/index.zodSchema";
import axios from "axios";

// react components starts here
const SignInPage = () => {
  const rout = useRouter();
  const [isError, setIsError] = useState<any>("");
  const [isLoginComplete, setIsLoginComplete] = useState(false)

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchemaLogin>) {
    axios.post("/api/user/signin", values).then((res) => {
      const { data } = res;
      if (data?.status) {
        const payload = data?.user;
        signIn("credentials", { redirect: false, ...payload });
        setIsLoginComplete(true)
      } else {
        console.log("error in sign in", data?.massage);
        setIsError(data?.massage);
      }
    });
  }

  // handle seaving phone number in local storage and redirect to OTP verification page
  if (isLoginComplete) {
      rout.refresh();
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
