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
import { getLsItem, ls, removeLsItem } from "@/lib/utils/storage/localstorage";
import { useRouter } from "next/navigation";

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

let isOtpVerified = false;

// 2. Define a submit handler.
async function onSubmit(values: z.infer<typeof formSchema>) {
  // TODO: to handle email verification
}

// react components starts here
const OtpVerificationCom = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  const rout = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  if (isOtpVerified) {
    rout.push("/overview");
  }

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* otp field */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Verification Code</FormLabel>
                <FormControl>
                  <Input placeholder="123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={cn("disabled:bg-gray-500 w-full mt-4")}
            disabled={form.formState.isSubmitting}
          >
            Verify OTP
          </Button>
        </form>
      </Form>
      <Separator className={cn("my-6")} orientation="horizontal" />
      <TypographyMuted className="text-center">
        By clicking continue, you agree to our Terms of Service and Privacy
        Policy.
      </TypographyMuted>
    </AuthWrapper>
  );
};

export default OtpVerificationCom;
