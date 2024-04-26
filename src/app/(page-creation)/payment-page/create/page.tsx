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
import InfoTooltip from "@/components/dashboard-layout/InfoTooltip";
import { cn } from "@/lib/utils/utils";
import { useSession } from "next-auth/react";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";
import { useRouter } from "next/navigation";
import { pageShortFormSchema } from "@/lib/zod/index.zodSchema";
import axios from "axios";

// React component starts here
const PageAdd = () => {
  const { data } = useSession();

  //!!: not in use
  // const [subdomainMsg, setSubdomainMsg] = useState<any>("");
  // const [isSubdomainChecking, setIsSubdomainChecking] = useState(false);
  // const [isSubdomainAvl, setIsSubdomainAvl] = useState(true);

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof pageShortFormSchema>>({
    resolver: zodResolver(pageShortFormSchema),
    defaultValues: {
      metaTitle: "",
      metaDesc: "",
      keywords: "",
      //!!: not in use
      // subdomain: "",
      // pageType: "simple-page",
    },
  });

  console.log("form hook", form.formState.isSubmitted);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof pageShortFormSchema>) {
    const userData = {
      user: data?.user,
    };

    axios.post("/api/page/create", { ...values, ...userData }).then((res) => {
      const { data } = res;
      if (data.status) {
        router.push(`/payment-page/create/${data.pageData?.id}`);
      }
    });
  }

  //!!: not in use
  // function handleCheckDomainAvl(subdomain: string) {
  //   setIsSubdomainChecking(true);
  //   if (subdomain.length < 4) {
  //     setSubdomainMsg("Subdomain must contain at least 4 character(s)");
  //     setIsSubdomainChecking(false);
  //     return;
  //   }

  //   checkSubdoamin(subdomain).then((res) => {
  //     if (res.status) {
  //       setIsSubdomainAvl(() => {
  //         setSubdomainMsg(res.massage);
  //         setIsSubdomainChecking(false);
  //         return false;
  //       });
  //     }

  //     setSubdomainMsg(res.massage);
  //     setIsSubdomainChecking(false);
  //   });
  // }

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
                      Meta Title{" "}
                      <InfoTooltip>
                        This is the catchy title people see in search results.{" "}
                        <br />
                        Think of it as the first impression for your page!
                      </InfoTooltip>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Short meta title for page seo."
                        {...field}
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
                      Meta description{" "}
                      <InfoTooltip>
                        This short blurb appears under the title in search
                        results. <br /> Use it to tell people what your page is
                        about and why they should click!
                      </InfoTooltip>{" "}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe about your page."
                        {...field}
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
                      Keywords{" "}
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* subdomain */}
              {/* <div className="flex justify-start items-end gap-3">
                <div className="grow">
                  {" "}
                  <FormField
                    control={form.control}
                    name="subdomain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className={cn(
                            "flex justify-start items-center gap-2"
                          )}
                        >
                          Subdomain{" "}
                          <InfoTooltip>
                            This is a prefix to your main website address (like
                            "blog." before your website name).
                            <br /> But can be useful for organizing your
                            content.
                          </InfoTooltip>{" "}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Choose your subdomain"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  disabled={isSubdomainChecking}
                  type="button"
                  className={cn("disabled:bg-gray-500")}
                  onClick={() => {
                    handleCheckDomainAvl(form.getValues("subdomain"));
                  }}
                >
                  {isSubdomainChecking ? (
                    <ButtonSpinner className="w-5 h-5" />
                  ) : (
                    "Check"
                  )}
                </Button>
              </div>
              <FormMessage className={cn("relative -top-6")}>
                {subdomainMsg && subdomainMsg}
              </FormMessage> */}

              {/* select page type */}
              {/* <FormField
                control={form.control}
                name="pageType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select page type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="simple-page" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {"Simple page ( No control )"}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="with-page-builder" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {" Build page with builder ( Full control )"}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <Button
                type="submit"
                className={cn("disabled:bg-gray-500 w-full mt-4")}
              >
                {form.formState.isSubmitting ? (
                  <ButtonSpinner className="w-5 h-5" />
                ) : (
                  "Next"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageAdd;
