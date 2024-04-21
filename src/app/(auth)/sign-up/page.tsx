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
import { Separator } from "@/components/ui/separator";
import TypographySmall from "@/components/typography/TypographySmall";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveUsersToDb } from "@/lib/actions";
import PolicyMsg from "@/components/auth-layout/PolicyMsg";
import SeparatorAuth from "@/components/auth-layout/SeparatorAuth";
import GoogleAuthButton from "@/components/auth-layout/GoogleAuthButton";
import { signIn } from "next-auth/react";
import { useState } from "react";
import ErrorAlert from "@/components/global/form/ErrorAlert";

export const formSchema = z.object({
  fullname: z.string().min(3, {
    message: "Full Name must be at least 3 characters.",
  }),
  email: z.string().email(),
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

// React conponent startss here
const SignUpPage = () => {
  const rout = useRouter();
  const [isError, setIsError] = useState<any>("");

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    saveUsersToDb(values).then((res) => {
      if (res?.status) {
        const payload = res?.payload;
        signIn("credentials", { redirect: false, ...payload });
        isLoginCom = true;
        console.log("error no")
        return;
      } else {
        console.log("error in sign in", res?.massage)
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
            disabled={form.formState.isSubmitting}
          >
            Next
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
