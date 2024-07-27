"use client";
import TypographyH4 from "@/components/typography/TypographyH4";
import TypographyMuted from "@/components/typography/TypographyMuted";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  cn,
  formatePageInputs,
  hashUrlExtractor,
  redirectToLink,
} from "@/lib/utils/utils";
import Tiptap from "./Tiptap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import {
  CalendarIcon,
  Cross1Icon,
  EyeOpenIcon,
  FilePlusIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { SliderPicker } from "react-color";
import { pageFormSchema, showToast } from "@/lib/zod/index.zodSchema";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import TypographyP from "@/components/typography/TypographyP";
import {
  TDetailsFields,
  TFieldAddEditDialog,
  TPageFaqs,
  TPagePolicies,
  TSettingFields,
  TTestimonials,
} from "@/lib/types/index.type";
import { usePathname, useRouter } from "next/navigation";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";
import axios from "axios";
import { useZustandSelector } from "@/context/zustand/slectors";
import { useFileHandler, usePageFormInputs } from "@/context/zustand/store";
import FileUploader from "@/components/upload/FileUploader";
import {
  COMPRESSED_FILE,
  SUPPORTED_IMAGE_FORMATES,
} from "@/lib/constants/index.constant";
import { clientError } from "@/lib/utils/error/errorExtractor";
import { evar } from "@/lib/envConstant";

/**
 * This function contains all the forms and inputs for page editor and creator. This use shadcn's tab components, zod validation, react-hook-form and shadcn's sonner.
 * @location components/dashboard-layout/pageCreation/tabs.tsx
 * @returns
 */
const PageTabs = ({ pageId }: { pageId: string }) => {
  const [publishingStatus, setPublishingStatus] = useState<
    "started" | "updating" | "success" | "error"
  >("started");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isWarningAlertDialogOpen, setIsWarningAlertDialogOpen] =
    useState(false);

  const path = usePathname();
  const rout = useRouter();

  const inputs = usePageFormInputs();
  const files = useFileHandler();

  useEffect(() => {
    setIsFormSubmitted(false);
  }, [inputs, files]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof pageFormSchema>>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      extProductLinks: inputs.extProductLinks,
      category: inputs.category,
      price: inputs.price,
      priceType: inputs.priceType,
      baseAuctionPrice: inputs.baseAuctionPrice,
      discountedPrice: inputs.discountedPrice,
      offerDiscountedPrice: inputs.offerDiscountedPrice,
      title: inputs.title,
      // files: inputs.files,
      pageDesc: inputs.pageDesc,
      contPhone: inputs.contPhone,
      contEmail: inputs.contEmail,
      pageField: inputs.pageOrderInputsInitial,
      thankYouNote: inputs.thankYouNote,
      buttonText: inputs.buttonText,
      metaPixel: inputs.metaPixel,
      googleAnalytics: inputs.googleAnalytics,
      // whatsappSupport: inputs.whatsappSupport,
      pageExpiry: inputs.pageExpiry,
      pageExpiryDate: inputs.pageExpiryDate,
      deactivateSales: inputs.deactivateSales,
      pageOwner: inputs.pageOwner,
      template: inputs.template,
      color: inputs.color,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof pageFormSchema>) {
    setPublishingStatus("updating");
    const fieldsInput = formatePageInputs(inputs, files);

    axios
      .post("/api/page/update", { fieldsInput, pageId })
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          setIsFormSubmitted(true);
          showToast(
            "Page details updated successfully",
            null,
            "Close",
            () => {}
          );

          setPublishingStatus("success");
        }
      })
      .catch((error) => {
        setIsFormSubmitted(false);
        setPublishingStatus("error");
        console.error("Error updating page details:", error);
        const errorMessage = clientError(error);
        showToast(errorMessage, null, "Close", () => {});
      })
      .finally(() => {
        setPublishingStatus("started");
      });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 relative"
        >
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                if (!isFormSubmitted) {
                  setIsWarningAlertDialogOpen(true);
                } else {
                  redirectToLink("/pages", "_self");
                }
              }}
            >
              <Cross1Icon />
            </Button>
            <div className="grow max-h-14 overflow-hidden">
              <TypographyP>{`${inputs.title?.slice(0, 35)}${
                inputs.title?.length > 35 ? "..." : ""
              }`}</TypographyP>
            </div>
            <Button
              onClick={() => {
                redirectToLink(`${path}?mode=preview`, "_blank");
              }}
              variant="outline"
              className="lg:hidden"
            >
              <EyeOpenIcon className="mr-2" /> Preview
            </Button>
          </div>

          <Tabs defaultValue="product" className="w-full h-full">
            <TabsList>
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="customise">Customise</TabsTrigger>
            </TabsList>

            <TabsContent value="product">
              <ScrollArea className="h-[calc(100vh-201px)] w-full">
                <ProductFields form={form} inputs={inputs} />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="details">
              <ScrollArea className="h-[calc(100vh-201px)] w-full">
                <DetailsFields form={form} inputs={inputs} />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="settings">
              <ScrollArea className="h-[calc(100vh-201px)] w-full">
                <SettingFields form={form} inputs={inputs} />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="customise">
              <ScrollArea className="h-[calc(100vh-201px)] w-full">
                <CustomiseFields form={form} inputs={inputs} />
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end items-center border-t pt-3">
            {publishingStatus === "updating" ? (
              <ButtonSpinner className="w-7 h-7" />
            ) : (
              <div className={buttonVariants({ variant: "default" })}>
                <Button className={cn("w-fit rounded-none")}>
                  Publish Changes
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>

      <AlertDialog
        open={isWarningAlertDialogOpen}
        onOpenChange={setIsWarningAlertDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave this
              page? You will lose your data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                redirectToLink("/pages", "_self");
              }}
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

/**
 * This function contains all the inputs for product tab section eg: price, categories, file and may be other
 * @location components/dashboard-layout/pageCreation/tabs.tsx
 * @returns
 */
export function ProductFields({ form, inputs }: TDetailsFields) {
  return (
    <div className="py-4 pl-2 w-[90%] ml-0 h-full">
      <TypographyMuted className={cn("font-semibold py-3")}>
        Step 1 of 4
      </TypographyMuted>
      <div className="flex flex-col gap-4 h-full">
        {/* File uploading */}
        <TypographyH4>Upload your digital files</TypographyH4>
        {/* <FileUploader
          fileType={COMPRESSED_FILE}
          countLimit={1}
          from="product"
        /> */}

        {/* external file link */}
        <div>
          <FormField
            control={form.control}
            name="extProductLinks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Link of your file</FormLabel>
                <FormControl>
                  <div className="w-full h-fit border border-foreground/40 border-dashed rounded py-8 cursor-pointer px-3 space-y-1">
                    <FormDescription>
                      Please enter the link to your digital file hosted on
                      Drive, Dropbox, or another cloud service. This link will
                      be displayed on the thank you page for users to download
                      the file.
                    </FormDescription>
                    <div className="flex items-center justify-start gap-2 py-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-lg font-thin hover:bg-background cursor-default select-none"
                        type="button"
                      >
                        <FilePlusIcon />
                      </Button>
                      <Input
                        className="w-full"
                        placeholder="e.g, https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view?usp=sharing"
                        value={inputs.extProductLinks}
                        onChange={(e) => {
                          inputs.setExtProductLinks(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="bg-foreground/20 h-2" />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(e) => {
                  inputs.setCategory(e);
                  field.onChange(e);
                }}
                defaultValue={inputs.category}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {inputs.categoriesValues.map((category, i) => (
                    <SelectItem key={i} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                <b>Selected category: </b>{" "}
                {!inputs.category ? "None" : inputs.category}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price setting */}
        <TypographyH4>Set Pricing</TypographyH4>

        {/* price type selection */}
        <div>
          <FormField
            control={form.control}
            name="priceType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={(e: any) => {
                      inputs.setPriceType(e);
                      field.onChange(e);
                    }}
                    defaultValue={inputs.priceType}
                    // {...field}
                    className="flex"
                  >
                    <FormItem
                      className={`flex items-center justify-start gap-2 border pb-3 px-3 rounded-md ${
                        field.value === "fixedPrice"
                          ? "border-primary"
                          : "border-muted"
                      }`}
                    >
                      <FormControl>
                        <RadioGroupItem value="fixedPrice" />
                      </FormControl>
                      <div>
                        <FormLabel className="font-normal cursor-pointer">
                          Fixed Price
                          <FormDescription>
                            Charge a one-time fixed pay
                          </FormDescription>
                        </FormLabel>
                      </div>
                    </FormItem>
                    <FormItem
                      className={`flex items-center justify-start gap-2 border pb-3 px-3 rounded-md ${
                        field.value === "auctionPrice"
                          ? "border-primary"
                          : "border-muted"
                      }`}
                    >
                      <FormControl>
                        <RadioGroupItem value="auctionPrice" />
                      </FormControl>
                      <div>
                        <FormLabel className="font-normal cursor-pointer">
                          Customers decide price
                          <FormDescription>
                            Let customers pay any price
                          </FormDescription>
                        </FormLabel>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* fixed price */}
        {inputs.priceType === "fixedPrice" && (
          <div>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <br />
                  <FormControl>
                    <div className="flex items-center justify-start gap-2 py-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-lg font-thin hover:bg-background cursor-default select-none"
                        type="button"
                      >
                        ₹
                      </Button>
                      <Input
                        type="number"
                        placeholder="Enter your product selling price"
                        value={JSON.stringify(inputs.price)}
                        onChange={(e) => {
                          inputs.setPrice(parseInt(e.target.value));
                          field.onChange(e);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* discounted price section */}
        {inputs.priceType === "fixedPrice" && (
          <div className="rounded-lg border p-3 shadow-sm">
            <FormField
              control={form.control}
              name="offerDiscountedPrice"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel>Offer discounted price</FormLabel>
                    <FormDescription>
                      Offer a discounted price to your customers to increase
                      your sales.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={inputs.offerDiscountedPrice}
                      onCheckedChange={(e) => {
                        inputs.setOfferDiscountedPrice(e);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {inputs.offerDiscountedPrice && (
              <>
                <br />
                <FormField
                  control={form.control}
                  name="discountedPrice"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Discounted price</FormLabel>
                      <br />
                      <FormControl>
                        <div className="flex items-center justify-start gap-2 py-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-lg font-thin hover:bg-background cursor-default select-none"
                            type="button"
                          >
                            ₹
                          </Button>
                          <Input
                            type="number"
                            placeholder="Enter your product discounted price"
                            value={JSON.stringify(inputs.discountedPrice)}
                            onChange={(e) => {
                              inputs.setDiscountedPrice(
                                parseInt(e.target.value)
                              );
                              field.onChange(e);
                            }}
                            // {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        )}

        {/* Auction Price */}
        {inputs.priceType === "auctionPrice" && (
          <div>
            <FormField
              control={form.control}
              name="baseAuctionPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Price</FormLabel>
                  <br />
                  <FormControl>
                    <div className="flex items-center justify-start gap-2 py-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-lg font-thin hover:bg-background cursor-default select-none"
                        type="button"
                      >
                        ₹
                      </Button>
                      <Input
                        type="number"
                        placeholder="Enter your product base price"
                        value={JSON.stringify(inputs.baseAuctionPrice)}
                        onChange={(e) => {
                          inputs.setBaseAuctionPrice(parseInt(e.target.value));
                          field.onChange(e);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * This function contains all the inputs for details tab section eg: title, coverImg, description and may be other
 * @location components/dashboard-layout/pageCreation/tabs.tsx
 * @returns
 */
export function DetailsFields({ form, inputs }: TDetailsFields) {
  return (
    <div className="py-4 pl-2 w-[90%] ml-0 h-full">
      <TypographyMuted className={cn("font-semibold py-3")}>
        Step 2 of 4
      </TypographyMuted>
      <div className="flex flex-col gap-4 h-full">
        <TypographyH4>Tell us about your page</TypographyH4>

        {/* title */}
        <div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Title</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Enter your page title"
                    value={inputs.title}
                    onChange={(e) => {
                      inputs.setTitle(e.target.value);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* cover upload */}
        <FormLabel>Product Images</FormLabel>
        <FileUploader
          fileType={SUPPORTED_IMAGE_FORMATES}
          countLimit={7}
          from="details"
        />

        {/* description */}
        <div>
          <FormField
            control={form.control}
            name="pageDesc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Tiptap field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* contact */}
        <div>
          <TypographyH4>Contact</TypographyH4>

          <div>
            <FormField
              control={form.control}
              name="contPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-start gap-2 py-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-sm font-thin hover:bg-background cursor-default select-none"
                        type="button"
                      >
                        +91
                      </Button>
                      <Input
                        type="number"
                        placeholder="e.g., 1234567890"
                        value={JSON.stringify(inputs.contPhone)}
                        onChange={(e) => {
                          inputs.setContPhone(parseInt(e.target.value));
                          field.onChange(e);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* contact email */}
            <FormField
              control={form.control}
              name="contEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add your contact email"
                      value={inputs.contEmail}
                      onChange={(e) => {
                        inputs.setContEmail(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* testimonial */}
        <div>
          <TypographyH4>Testimonial(s)</TypographyH4>
          {inputs.testimonials.map((testimonial: TTestimonials, i: number) => (
            <div
              key={i}
              className={`border-muted border-2 px-5 pb-5 ${
                i !== 0 ? "pt-8" : "pt-5"
              } rounded-md my-2 relative`}
            >
              <Label htmlFor="tesName">Name</Label>
              <Input
                id="tesName"
                placeholder="Name"
                value={inputs.testimonials[i].testiName}
                onChange={(e) =>
                  inputs.setTestimonials(e.target.value, "testiName", i)
                }
              />
              <br />
              <Label htmlFor="tesMsg">Message</Label>
              <Textarea
                id="tesMsg"
                placeholder="Message by customers"
                value={inputs.testimonials[i].testiMsg}
                onChange={(e) =>
                  inputs.setTestimonials(e.target.value, "testiMsg", i)
                }
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="top-2 right-2 absolute"
                onClick={() => inputs.removeTestimonials(i)}
              >
                <Cross1Icon />
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            type="button"
            className={cn(
              "w-full mt-4 rounded-md flex justify-center items-center gap-1"
            )}
            onClick={inputs.addTestimonials}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-plus"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>{" "}
            Add more testimonial fields: {`${inputs.testimonials.length}`}
          </Button>
        </div>

        <Separator className="bg-foreground/20 h-2" />

        {/* Faq */}
        <div>
          <TypographyH4>Frequently Asked Questions (FAQs)</TypographyH4>
          {inputs.faqs.map((faq: TPageFaqs, i: number) => (
            <div
              key={i}
              className={`border-muted border-2 px-5 pb-5 ${
                i !== 0 ? "pt-8" : "pt-5"
              } rounded-md my-2 relative`}
            >
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                placeholder="Add your question"
                value={inputs.faqs[i].question}
                onChange={(e) => inputs.setFaqs(e.target.value, "question", i)}
              />
              <br />
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                placeholder="Add your answer"
                value={inputs.faqs[i].answer}
                onChange={(e) => inputs.setFaqs(e.target.value, "answer", i)}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="top-2 right-2 absolute"
                onClick={() => inputs.removeFaqs(i)}
              >
                <Cross1Icon />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full mt-4 rounded-md flex justify-center items-center gap-1"
            )}
            onClick={inputs.addFaqs}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-plus"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>{" "}
            Add more faq fields: {inputs.faqs.length}
          </Button>
        </div>

        <Separator className="bg-foreground/20 h-2" />

        {/* policy */}
        <div>
          <TypographyH4>Policies</TypographyH4>
          {inputs.policies.map((policy: TPagePolicies, i: number) => (
            <div
              key={i}
              className={`border-muted border-2 px-5 pb-5 ${
                i !== 0 ? "pt-8" : "pt-5"
              } rounded-md my-2 relative`}
            >
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter your title"
                value={inputs.policies[i].title}
                onChange={(e) => inputs.setPolicies(e.target.value, "title", i)}
              />
              <br />
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter your content"
                value={inputs.policies[i].content}
                onChange={(e) =>
                  inputs.setPolicies(e.target.value, "content", i)
                }
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="top-2 right-2 absolute"
                onClick={() => inputs.removePolicies(i)}
              >
                <Cross1Icon />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full mt-4 rounded-md flex justify-center items-center gap-1"
            )}
            onClick={inputs.addPolicies}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-plus"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>{" "}
            Add more policy fields: {inputs.policies.length}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * This function contains all the inputs for setting tab section eg: fields, tracking and may be other
 * @location components/dashboard-layout/pageCreation/tabs.tsx
 * @returns
 */
export function SettingFields({ form, inputs }: TDetailsFields) {
  return (
    <div className="py-4 pl-2 w-[90%] ml-0 h-full relative">
      <TypographyMuted className={cn("font-semibold py-3")}>
        Step 3 of 4
      </TypographyMuted>
      <div className="flex flex-col gap-4 h-full">
        <TypographyH4>Registration Fields</TypographyH4>
        <TypographyMuted>
          We collect <b>full name</b>, <b>phone number</b> and <b>email</b> by
          default from buyers at checkout
        </TypographyMuted>

        {/* Display for avil field(s) */}
        {inputs.pageOrderInputs.length > 0 &&
          inputs.pageOrderInputs.map((field, i) => (
            <div
              key={i}
              className="border rounded-md px-4 py-2 flex justify-between items-center"
            >
              <div>
                {" "}
                <TypographyP className="text-sm ">
                  Placeholder - {field?.placeholder}
                </TypographyP>
                <TypographyMuted className="text-xs">
                  Field type - {field?.type?.split("-")[0]}
                </TypographyMuted>
                <TypographyMuted className="text-xs">
                  Required - {`${field?.required ? "Yes" : "No"}`}
                </TypographyMuted>
              </div>
              {/* Editing and deleting section of filed */}
              {i > 2 ? (
                <div>
                  <div className="space-x-2">
                    <FieldAddEditDialog
                      form={form}
                      action="Edit field"
                      actionType="edit"
                      index={i}
                    >
                      {/* handling edit */}
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          inputs.refillPageOrderInputs(i);
                        }}
                      >
                        <Pencil1Icon />
                      </Button>
                    </FieldAddEditDialog>

                    {/* handling Delete */}
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        inputs.operationOnPageOrderInputs(i, "delete");
                      }}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-x-2">
                  {/* only for inproving ui and making ui consistant */}
                  <Button
                    type="button"
                    disabled={true}
                    variant="outline"
                    size="icon"
                  >
                    <Pencil1Icon />
                  </Button>

                  {/* handling Delete */}
                  <Button
                    type="button"
                    disabled={true}
                    variant="outline"
                    size="icon"
                  >
                    <TrashIcon />
                  </Button>
                </div>
              )}
            </div>
          ))}

        {/* form fields addition*/}
        <div>
          <FieldAddEditDialog
            form={form}
            action="Add field"
            actionType="create"
            index={-1}
          >
            <Button
              type="button"
              variant="outline"
              onClick={inputs.resetPageOrderInputs}
            >
              + Add field
            </Button>
          </FieldAddEditDialog>
        </div>

        <Separator className="bg-foreground/20 h-2" />

        <TypographyH4>Checkout Settings</TypographyH4>

        {/* thank you field */}
        <div>
          <FormField
            control={form.control}
            name="thankYouNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thank you Note</FormLabel>
                <FormDescription>
                  Show a thank you message to the buyer after purchase
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Enter your message"
                    value={inputs.thankYouNote}
                    onChange={(e) => {
                      inputs.setThankYouNote(e.target.value);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Redirect after purchase */}
        <div>
          <FormField
            control={form.control}
            name="buttonText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Text</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: Buy Now"
                    value={inputs.buttonText}
                    onChange={(e) => {
                      inputs.setButtonText(e.target.value);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="bg-foreground/20 h-2" />

        <TypographyH4>Tracking</TypographyH4>

        {/* meta pixel */}
        <div>
          <FormField
            control={form.control}
            name="metaPixel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Pixel</FormLabel>
                <FormDescription>
                  Connect your Pixel IDs to this product to run re-marketing
                  campaigns on Meta Business
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="e.g., 123456789012"
                    value={inputs.metaPixel}
                    onChange={(e) => {
                      inputs.setMetaPixel(e.target.value);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button className="mt-2" variant="ghost">
            + Add new Pixel ID
          </Button> */}
        </div>

        {/* Google Analytics */}
        <div>
          <FormField
            control={form.control}
            name="googleAnalytics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Analytics</FormLabel>
                <FormDescription>
                  Add your Google Analytics Tracking IDs to get crucial visitors
                  level data on your GA dashboard
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="e.g., UA-123456789-1"
                    value={inputs.googleAnalytics}
                    onChange={(e) => {
                      inputs.setGoogleAnalytics(e.target.value);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button className="mt-2" variant="ghost">
            + Add new Tracking Id
          </Button> */}
        </div>

        <Separator className="bg-foreground/20 h-2" />

        <TypographyH4>Advanced Options</TypographyH4>

        {/* whatsapp support */}
        {/* <div>
          <FormField
            control={form.control}
            name="whatsappSupport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Whatsapp Support</FormLabel>
                <FormDescription>
                  Provide Support Whatsapp Number for queries and issues.
                </FormDescription>
                <FormControl>
                  <div className="flex items-center justify-start gap-2 py-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-sm font-thin hover:bg-background cursor-default select-none"
                      type="button"
                    >
                      +91
                    </Button>
                    <Input
                      type="number"
                      placeholder="eg: 1234567890"
                      value={JSON.stringify(inputs.whatsappSupport)}
                      onChange={(e) => {
                        inputs.setWhatsappSupport(parseInt(e.target.value));
                        field.onChange(e);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}

        {/* Page Expiry field */}
        <div className="rounded-lg border p-3 shadow-sm">
          <FormField
            control={form.control}
            name="pageExpiry"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Page Expiry</FormLabel>
                  <FormDescription>
                    Turning on this option will make the page and its content
                    expire after a defined period of time
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={inputs.pageExpiry}
                    onCheckedChange={(e) => {
                      inputs.setPageExpiry(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {inputs.pageExpiry && (
            <>
              <br />
              <FormField
                control={form.control}
                name="pageExpiryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Select page expiry date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {inputs.pageExpiryDate ? (
                              format(inputs.pageExpiryDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={inputs.pageExpiryDate}
                          onSelect={(e) => {
                            inputs.setPageExpiryDate(e);
                            field.onChange(e);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Pick a date for page expiry
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Deactivate Sales fields */}
        <div>
          <FormField
            control={form.control}
            name="deactivateSales"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Deactivate Sales</FormLabel>
                  <FormDescription>
                    Once deactivated, no one will be able to make purchases on
                    your page.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={inputs.deactivateSales}
                    onCheckedChange={(e) => {
                      inputs.setDeactivateSales(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * This function contains all the inputs for customise tab section eg: theme, color, name and may be other
 * @location components/dashboard-layout/pageCreation/tabs.tsx
 * @returns
 */
export function CustomiseFields({ form, inputs }: TDetailsFields) {
  return (
    <div className="py-4 pl-2 w-[90%] ml-0 h-full relative">
      <TypographyMuted className={cn("font-semibold py-3")}>
        Step 4 of 4
      </TypographyMuted>
      <div className="flex flex-col gap-4 h-full">
        <TypographyH4>Customise your page</TypographyH4>
        <FileUploader
          fileType={SUPPORTED_IMAGE_FORMATES}
          from="customise"
          countLimit={1}
        />

        {/* page owner field */}
        <div>
          <FormField
            control={form.control}
            name="pageOwner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Owner</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`e.g., ${evar.projectName}`}
                    value={inputs.pageOwner}
                    onChange={(e) => {
                      inputs.setPageOwner(e.target.value);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="bg-foreground/20 h-2" />

        {/* select page Template */}
        <div>
          <TypographyH4 className="mb-3">Select Template</TypographyH4>
          <FormField
            control={form.control}
            name="template"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={(e: any) => {
                      inputs.setTemplate(e);
                      field.onChange(e);
                    }}
                    defaultValue={inputs.template}
                    className="flex justify-start items-center gap-5"
                  >
                    {/* light radio */}
                    <FormItem
                      className={`${
                        inputs.template === "light" &&
                        "border border-primary w-fit h-fit rounded-md px-3 py-2"
                      }`}
                    >
                      <div className="flex items-center">
                        <FormControl>
                          <RadioGroupItem value="light" className="hidden" />
                        </FormControl>
                        <FormLabel
                          className={`font-normal flex justify-center flex-col items-center gap-2 cursor-pointer ${
                            inputs.template === "light" && "text-primary"
                          }`}
                        >
                          <div className="w-fit h-fit rounded-md overflow-hidden">
                            <Image
                              src={"/white.png"}
                              width={155}
                              height={100}
                              alt="light"
                              objectFit="cover"
                            />
                          </div>
                          Light (default)
                        </FormLabel>
                      </div>
                    </FormItem>

                    {/* dark radio */}
                    <FormItem
                      className={`${
                        inputs.template === "dark" &&
                        "border border-primary w-fit h-fit rounded-md px-3 py-2"
                      }`}
                    >
                      <div className="flex items-center">
                        <FormControl>
                          <RadioGroupItem value="dark" className="hidden" />
                        </FormControl>
                        <FormLabel
                          className={`font-normal flex justify-center flex-col items-center gap-2 cursor-pointer ${
                            inputs.template === "dark" && "text-primary"
                          }`}
                        >
                          <div className="w-fit h-fit rounded-md overflow-hidden">
                            <Image
                              src={"/black.png"}
                              width={155}
                              height={100}
                              alt="dark"
                              objectFit="cover"
                            />
                          </div>
                          Dark
                        </FormLabel>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* select color */}
        <div>
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <>
                    <SliderPicker
                      color={inputs.color.hex}
                      onChange={(e) => {
                        inputs.setColor(e.hex);
                        field.onChange(e);
                      }}
                    />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * This function contains shadcn's Dialog to add and edit input fields eg: fields, tracking and may be other
 * @location components/dashboard-layout/pageCreation/tabs.tsx
 * @returns
 */
export const FieldAddEditDialog = ({
  form,
  action,
  children,
  actionType,
  index,
}: TFieldAddEditDialog) => {
  const inputs = usePageFormInputs();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Checkout Fields</DialogTitle>
          <br />
          <DialogDescription>
            {/* selector */}
            <div>
              <FormField
                control={form.control}
                name="pageField.type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select field type</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        inputs.setPageOrderInputs(e, "type");
                        field.onChange(e);
                      }}
                      defaultValue={inputs.pageOrderInputsInitial.type}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select field type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="text-text">Text</SelectItem>
                        <SelectItem value="email-email">Email</SelectItem>
                        <SelectItem value="number-phone">
                          Phone number
                        </SelectItem>
                        <SelectItem value="date-date">Date picker</SelectItem>
                        <SelectItem value="number-number">Number</SelectItem>
                        <SelectItem value="text-pan">PAN number</SelectItem>
                        <SelectItem value="number-aadhar">
                          Aadhar number
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <br />
            {/* placeholder */}
            <FormField
              control={form.control}
              name="pageField.placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placeholder</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Placeholder"
                      value={inputs.pageOrderInputsInitial.placeholder}
                      onChange={(e) => {
                        inputs.setPageOrderInputs(
                          e.target.value,
                          "placeholder"
                        );
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            {/* checkbox */}
            <FormField
              control={form.control}
              name="pageField.required"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={inputs.pageOrderInputsInitial.required}
                      onCheckedChange={(e) => {
                        inputs.setPageOrderInputs(e, "required");
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">
                      Field is compulsory
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            className="bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-1 rounded-sm"
            onClick={() => {
              inputs.operationOnPageOrderInputs(index, actionType);
            }}
          >
            {action}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PageTabs;
