"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils/utils";
import { useEffect, useState } from "react";
import ErrorAlert from "@/components/global/form/ErrorAlert";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import TypographyMuted from "@/components/typography/TypographyMuted";
import TypographyH2 from "@/components/typography/TypographyH2";
import { clientError } from "@/lib/utils/error/errorExtractor";

const ResetPassword = ({
  params: { token },
}: {
  params: { token: string };
}) => {
  const rout = useRouter();
  const [isError, setIsError] = useState<any>("");
  const [passwordResetStatus, setPasswordResetStatus] = useState<
    "started" | "resetting" | "redirecting"
  >("started");
  const [isTokenVerified, setIsTokenVerified] = useState<
    "verifying" | "verified" | "unauthorized" | "expired"
  >("verifying");
  const [user, setUser] = useState({name: "loading..."});

  const ReEnterPassword = z
    .object({
      password: z
        .string()
        .min(8, {
          message: "Password must be at least 8 characters",
        })
        .max(16, {
          message: "Password max contain 16 characters",
        })
        .trim()
    })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ReEnterPassword>) {
    setPasswordResetStatus("resetting");

    toast
      .promise(
        axios.post("/api/user/signin/forgot-password/reset-password", {
          ...values,
          user,
        }),
        {
          pending: "Resetting password...",
          success: "Password reset successfully!",
          error: "Failed to reset password. Please try again.",
        }
      )
      .then((res) => {
        const {
          status,
          data: { message },
        } = res;

        if (status === 200) {
          setPasswordResetStatus("redirecting");
          return;
        }
        setPasswordResetStatus("started");
      })
      .catch((error) => {
        setPasswordResetStatus("started");
        const errorMessage = clientError(error)

        setIsError(errorMessage); // Set the extracted message as the error state
      });
  }

  const form = useForm<z.infer<typeof ReEnterPassword>>({
    resolver: zodResolver(ReEnterPassword),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    if (passwordResetStatus === "redirecting") {
      toast.info("Redirection to sign in page");
      rout.push("/sign-in");
      setPasswordResetStatus("started");
    }
  }, [passwordResetStatus]);

  useEffect(() => {
    setIsTokenVerified("verifying");

    axios
      .post("/api/user/signin/forgot-password/verify-token", { token })
      .then((res) => {
        const {
          data: { message, error, user },
          status,
        } = res;

        if (status === 200) {
          setIsTokenVerified("verified");
          setUser(user);
        }
        if (status === 410) {
          setIsTokenVerified("expired");
        }

        if (status === 400) {
          setIsTokenVerified("unauthorized");
        }
      })
      .catch((error) => {
        if (error.response) {
          const { status } = error.response;

          if (status === 500) {
            console.log("Server error: There is an error on the server.");
            setIsTokenVerified("unauthorized");
          } else if (status === 400) {
            setIsTokenVerified("unauthorized");
          } else if (status === 410) {
            setIsTokenVerified("expired");
          } else {
            console.log(`Unexpected error: ${status}`);
            setIsTokenVerified("unauthorized");
          }
        } else {
          console.log("Network error or request was not completed");
          setIsTokenVerified("unauthorized");
        }
      });
  }, []);

  if (isTokenVerified === "verifying") {
    return <PageSpinner />;
  }

  if (isTokenVerified === "expired") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <TypographyMuted>Link is expired</TypographyMuted>
      </div>
    );
  }

  if (isTokenVerified === "unauthorized") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <TypographyMuted>Invalid Link</TypographyMuted>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full px-5 flex-col gap-3">
      <TypographyH2>Hello {user?.name}</TypographyH2>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            {" "}
            Create a new password for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              {/* password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter new password</FormLabel>
                    <FormControl>
                      <Input placeholder="F$%$N6573n#6y" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isError && (
                <ErrorAlert isError={isError} setIsError={setIsError} />
              )}
              {passwordResetStatus === "started" ? (
                <Button
                  type="submit"
                  className={cn("disabled:bg-gray-500 w-full mt-4 py-1")}
                >
                  Reset Password
                </Button>
              ) : passwordResetStatus === "resetting" ? (
                <div className="flex items-center justify-center gap-2 py-1">
                  <ButtonSpinner className="w-5 h-5" /> Resetting password!
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 py-1">
                  {" "}
                  <ButtonSpinner className="w-5 h-5" /> Redirecting to sign in
                  page!
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
