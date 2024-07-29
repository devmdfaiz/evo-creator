"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, hashUrlExtractor } from "@/lib/utils/utils";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";
import { useRouter, useSearchParams } from "next/navigation";
import { pageShortFormSchema, showToast } from "@/lib/zod/index.zodSchema";
import axios from "axios";
import TypographyP from "@/components/typography/TypographyP";
import { usePageSeo } from "@/context/zustand/store";
import { useEffect, useMemo, useState } from "react";
import { clientError } from "@/lib/utils/error/errorExtractor";
import PageSpinner from "@/components/global/spinner/PageSpinner";
import InfoTooltip from "@/components/dashboard-components/InfoTooltip";
import InputTracker from "@/components/global/InputTracker/InputTracker";

// React component starts here
const PageAdd = ({
  params,
}: {
  params: { "action-type": "create" | "update" };
}) => {
  const inputs = usePageSeo();
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");

  const [pageSeoHash, setPageSeoHash] = useState("");
  const [actionStatus, setActionStatus] = useState<
    "started" | "creating" | "updating" | "redirecting"
  >("started");
  const [isMounted, setIsMounted] = useState(false);
  const rout = useRouter();

  const actionType = params["action-type"];

  // 1. Define your form.
  const form = useForm<z.infer<typeof pageShortFormSchema>>({
    resolver: zodResolver(pageShortFormSchema),
    defaultValues: {
      metaTitle: inputs.metaTitle,
      metaDesc: inputs.metaDesc,
      keywords: inputs.keywords,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof pageShortFormSchema>) {
    setActionStatus(() => {
      return actionType === "create" ? "creating" : "updating";
    });
    6;
    const { fullHash } = hashUrlExtractor();

    axios
      .post("/api/page/create", { ...values, fullHash, actionType, pageId })
      .then((res) => {
        const { data, status } = res;
        if (status === 201) {
          showToast(data.message, null, "Close", () => {});
          return data;
        }

        if (status === 200) {
          showToast(data.message, null, "Close", () => {});
          setActionStatus("started");
          return data;
        }
      })
      .then((data) => {
        if (actionType === "create") {
          setActionStatus("redirecting");
          rout.push(`/payment-page/create/${data.pageData.id}`);
        }
      })
      .catch((error) => {
        console.log("Error in creating page: ", error);

        if (error.response.status === 403) {
          showToast(
            error.response.data.message,
            error.response.data.error,
            "Close",
            () => {}
          );
          setActionStatus("started");
          return;
        }

        setActionStatus("started");
        const errorMessage = clientError(error);
        showToast(errorMessage, null, "Close", () => {});
      });
  }

  if (actionType !== "create" && actionType !== "update") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <TypographyP>Oops! This page does not exist.</TypographyP>
      </div>
    );
  }

  if (!isMounted) {
    return <PageSpinner />;
  }

  return (
    <div className="flex items-center justify-center my-10">
      <Card className="w-[100%] sm:w-[90%] lg:w-[50%]">
        <CardHeader>
          <CardTitle className={cn("leading-5 sm:hidden")}>
            Craft a Page That Ranks
          </CardTitle>
          <CardDescription className={cn("sm:hidden")}>
            Master search engines with our easy SEO tools. Dominate rankings,
            get seen by the world!
          </CardDescription>
          <CardTitle className={cn("leading-5 hidden sm:block")}>
            Unleash Your Inner SEO Ninja: Craft a Page That Ranks
          </CardTitle>
          <CardDescription className={cn("leading-5 hidden sm:block")}>
            Tired of website shadows? Become a master of search engines with our
            easy-to-use SEO tools. Build a page that dominates the rankings and
            gets seen by the world!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* form here */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* short title */}
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={cn("flex justify-start items-center gap-2")}
                    >
                      Meta Title*
                      <InputTracker
                        current={form.watch("metaTitle")}
                        max={60}
                      />
                      <InfoTooltip>
                        This is the catchy title people see in search results.{" "}
                        <br />
                        Think of it as the first impression for your page!
                      </InfoTooltip>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Short meta title for page seo."
                        value={inputs.metaTitle}
                        onChange={(e) => {
                          inputs.setMetaTitle(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* short desc */}
              <FormField
                control={form.control}
                name="metaDesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={cn("flex justify-start items-center gap-2")}
                    >
                      Meta description*
                      <InputTracker
                        current={form.watch("metaDesc")}
                        max={160}
                      />
                      <InfoTooltip>
                        This short blurb appears under the title in search
                        results. <br /> Use it to tell people what your page is
                        about and why they should click!
                      </InfoTooltip>{" "}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe about your page."
                        value={inputs.metaDesc}
                        onChange={(e) => {
                          inputs.setMetaDesc(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* keywords */}
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={cn("flex justify-start items-center gap-2")}
                    >
                      Keywords*
                      <InputTracker current={form.watch("keywords")} max={60} />
                      <InfoTooltip>
                        These are the words people might use to find your page.
                        <br />
                        Include relevant keywords to help search engines
                        understand your content.
                      </InfoTooltip>{" "}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="reels bundle, ai reels bundles, ....."
                        value={inputs.keywords}
                        onChange={(e) => {
                          inputs.setKeywords(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {actionStatus === "started" ? (
                <Button
                  type="submit"
                  className={cn("disabled:bg-gray-500 w-full mt-4")}
                >
                  {actionType === "create" ? "Next" : "Update"}
                </Button>
              ) : (
                <div className="flex items-center justify-center w-full h-fit gap-2">
                  <ButtonSpinner className="w-5 h-5" />{" "}
                  {actionStatus === "creating"
                    ? "Creating page..."
                    : actionStatus === "updating"
                    ? "Updating seo details..."
                    : "Redirecting to the page editor..."}
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageAdd;
