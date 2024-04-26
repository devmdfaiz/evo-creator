"use client";
import TypographyH4 from "@/components/typography/TypographyH4";
import TypographyMuted from "@/components/typography/TypographyMuted";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils/utils";
import Tiptap from "./Tiptap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useContext, useEffect, useState } from "react";
import {
  CalendarIcon,
  Cross1Icon,
  EyeOpenIcon,
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
import { PageContext } from "@/context/PageFieldsProvider";
import {
  formValuesArrFun,
  formValuesFun,
  pageFormSchema,
  showToast,
} from "@/lib/zod/index.zodSchema";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import TypographyP from "@/components/typography/TypographyP";
import { categoriesData } from "@/lib/utils/constants";
import {
  TDetailsFields,
  TFieldAddEditDialog,
  TFieldDetails,
  TPageFaqs,
  TPagePolicies,
  TPageTestimonialsFields,
  TSettingFields,
} from "@/lib/types/index.type";
import { defaultFieldValue } from "@/lib/constants/index.constant";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setLsItem } from "@/lib/utils/storage/localstorage";
import ButtonSpinner from "@/components/global/spinner/ButtonSpinner";
import axios from "axios";

/**
 * This function contains all the forms and inputs for page editor and creator. This use shadcn's tab components, zod validation, react-hook-form and shadcn's sonner.
 * @location components/dashboard-layout/pageCreation/tabs.tsx
 * @returns
 */
const PageTabs = ({ pageId }: { pageId: string }) => {
  const [testimonialsFields, setTestimonialsFieds] = useState<
    TPageTestimonialsFields[]
  >([{ testiName: "", testiMsg: "" }]);
  const [faqs, setFaqs] = useState<TPageFaqs[]>([{ question: "", answer: "" }]);
  const [policies, setPolicies] = useState<TPagePolicies[]>([
    { title: "", content: "" },
  ]);
  const [fieldDetails, setFieldDetails] =
    useState<TFieldDetails[]>(defaultFieldValue);
  const { setfieldValue }: any = useContext(PageContext);
  const path = usePathname();
  const rout = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof pageFormSchema>>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      //!! product page fields
      extProductLinks: "",
      category: "",
      price: null,
      priceType: "fixedPrice",
      baseAuctionPrice: null,
      discountedPrice: null, // Optional field
      offerDiscountedPrice: false,
      //!! details page fields
      title: "",
      coverImg: "",
      pageDesc: "",
      contPhone: null,
      contEmail: "",
      //!! setting page fields
      pageField: {
        fieldType: "",
        placeholder: "",
        isRequired: false,
      },
      thankYouNote: "",
      redirectionUrl: "",
      metaPixel: "",
      googleAnalytics: "",
      whatsappSupport: null,
      pageExpiry: false,
      pageExpiryDate: null,
      deactivateSales: false,
      //!! Customise page section
      pageOwner: "",
      template: "light",
      color: { hex: "#E9570C" },
    },
  });

  const formValuesArr: any = formValuesArrFun(form);

  const formValues = formValuesFun(
    form,
    faqs,
    policies,
    testimonialsFields,
    fieldDetails
  );

  useEffect(() => {
    setfieldValue(formValues);
    setLsItem("fieldValue", formValues);
  }, [
    ...formValuesArr,
    faqs.length,
    policies.length,
    testimonialsFields.length,
    fieldDetails.length,
  ]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof pageFormSchema>) {
    console.log("i clicked");

    const fieldsInput = {
      values,
      testimonialsFields,
      faqs,
      policies,
      fieldDetails,
      pageId,
    };

    console.log("i clicked");

    axios.post("/api/page/update", fieldsInput).then((res) => {
      const { data } = res;
      alert(data.massage);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 relative"
      >
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              rout.push("/pages");
            }}
            type="button"
            variant="ghost"
            size="icon"
          >
            <Cross1Icon />
          </Button>
          <div className="grow max-h-14 overflow-hidden">
            <TypographyP>{`${form.watch("title").slice(0, 35)}${
              form.watch("title").length > 35 ? "..." : ""
            }`}</TypographyP>
          </div>
          <Link
            href={`${path}?mode=preview`}
            target="_blank"
            className="lg:hidden border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground text-accent-foreground flex gap-1 justify-center items-center py-1 px-2 rounded-sm"
          >
            <EyeOpenIcon className="mr-2" /> Preview
          </Link>
        </div>

        <Tabs defaultValue="product" className="w-full h-full">
          <TabsList>
            <TabsTrigger value="product">Product</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="customise">Customise</TabsTrigger>
          </TabsList>

          <TabsContent value="product">
            <ScrollArea className="h-[90vh] w-full">
              <ProductFields form={form} />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="details">
            <ScrollArea className="h-[90vh] w-full">
              <DetailsFields
                form={form}
                testimonialsFields={testimonialsFields}
                setTestimonialsFieds={setTestimonialsFieds}
                faqs={faqs}
                setFaqs={setFaqs}
                policies={policies}
                setPolicies={setPolicies}
                formValues={formValues}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="settings">
            <ScrollArea className="h-[90vh] w-full">
              <SettingFields
                fieldDetails={fieldDetails}
                setFieldDetails={setFieldDetails}
                form={form}
                formValues={formValues}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="customise">
            <ScrollArea className="h-[90vh] w-full">
              <CustomiseFields form={form} />
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="lg:fixed lg:-top-4 lg:right-4 z-50 hidden lg:block">
          <Button className={cn("w-fit")}>
            {form.formState.isSubmitting ? <ButtonSpinner /> : "Publish"}
          </Button>
        </div>

        <div className="lg:hidden z-50 bg-card bottom-0 left-0 right-0 absolute flex justify-end items-center py-3">
          <Button className={cn("w-fit")}>Publish</Button>
        </div>
      </form>
    </Form>
  );
};

/**
 * This function contains all the inputs for product tab section eg: price, categories, file and may be other
 * @location components/dashboard-layout/pageCreation/tabs.tsx
 * @returns
 */
export function ProductFields({ form }: { form: any }) {
  const [categories, setCategories] = useState<string[]>(categoriesData);

  return (
    <div className="py-4 w-[90%] ml-0 h-full">
      <TypographyMuted className={cn("font-semibold py-3")}>
        Step 1 of 4
      </TypographyMuted>
      <div className="flex flex-col gap-4 h-full">
        {/* File uploading */}
        <TypographyH4>Upload your digital files</TypographyH4>
        <div className="border border-foreground/30 border-dashed rounded-md py-4 px-6 ">
          {/* Uploadthing file upload */}
          <p>TODO: Upload thing file upload</p>

          <div>
            <FormField
              control={form.control}
              name="extProductLinks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add external link</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-start gap-2 py-1">
                      <Input
                        placeholder="Add your file link"
                        // value={field.value}
                        // onChange={field.onChange}
                        {...field}
                      />
                      <Button type="button" variant="outline">
                        Add
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="bg-foreground/20 h-2" />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category, i) => (
                    <SelectItem key={i} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
        {form.watch("priceType") === "fixedPrice" && (
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
                        {...field}
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
        {form.watch("priceType") === "fixedPrice" && (
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
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("offerDiscountedPrice") && (
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
                            {...field}
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
        {form.watch("priceType") === "auctionPrice" && (
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
                        {...field}
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
export function DetailsFields({
  form,
  testimonialsFields,
  setTestimonialsFieds,
  faqs,
  setFaqs,
  policies,
  setPolicies,
  formValues,
}: TDetailsFields) {
  const { setfieldValue }: any = useContext(PageContext);

  //!!: handler functions starts here
  // ??: handler functions for testimonial
  function handleTestimonialFieldAdd() {
    if (testimonialsFields.length < 4) {
      setTestimonialsFieds((prev: any) => {
        const newField = { testiName: "", testiMsg: "" };
        return [...prev, newField];
      });
      // setfieldValue(formValues);
    }
  }

  function handleTestimonialFieldDelete(i: number) {
    setTestimonialsFieds((prev: any) => {
      const filteredFields = prev.filter((d: string, index: number) => {
        return index !== i;
      });
      return [...filteredFields];
    });
    // setfieldValue(formValues);
  }

  function handleTestiInput(e: any, props: string, index: number) {
    const input = e.target.value;

    setTestimonialsFieds((prev: any) => {
      const newValue = [...prev];
      newValue[index][props] = input;
      return newValue;
    });
    setfieldValue(formValues);
  }

  // ??: handler functions for faq
  function handleFaqFieldAdd() {
    setFaqs((prev: any) => {
      const newField = { question: "", answer: "" };
      return [...prev, newField];
    });
    // setfieldValue(formValues);
  }
  function handleFaqFieldDelete(i: number) {
    setFaqs((prev: any) => {
      const filteredFields = prev.filter((d: string, index: number) => {
        return index !== i;
      });
      return [...filteredFields];
    });
    // setfieldValue(formValues);
  }

  function handleFaqInput(e: any, props: string, index: number) {
    const input = e.target.value;

    setFaqs((prev: any) => {
      const newValue = [...prev];
      newValue[index][props] = input;
      return newValue;
    });
    setfieldValue(formValues);
  }

  // ??: handler functions for policy
  function handlePolicyFieldAdd() {
    setPolicies((prev: any) => {
      const newField = { title: "", content: "" };
      return [...prev, newField];
    });
    // setfieldValue(formValues);
  }
  function handlePolicyFieldDelete(i: number) {
    setPolicies((prev: any) => {
      const filteredFields = prev.filter((d: string, index: number) => {
        return index !== i;
      });
      return [...filteredFields];
    });
    // setfieldValue(formValues);
  }

  function handlePolicyInput(e: any, props: string, index: number) {
    const input = e.target.value;

    setPolicies((prev: any) => {
      const newValue = [...prev];
      newValue[index][props] = input;
      return newValue;
    });
    setfieldValue(formValues);
  }

  return (
    <div className="py-4 w-[90%] ml-0 h-full">
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* TODO: category section */}

        {/* cover upload */}
        <Label>Cover Image</Label>
        <div className="border border-foreground/30 border-dashed rounded-md py-4 px-6 w-full">
          {/* Uploadthing file upload */}
          <p>TODO: Upload thing file upload</p>

          <div className="flex items-center justify-start gap-2 py-1 w-full">
            <FormField
              control={form.control}
              name="coverImg"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Add external link</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-start gap-2 py-1 w-full">
                      <Input placeholder="Add your file link" {...field} />
                      <Button type="button" variant="outline">
                        Add
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

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
                        placeholder="eg: 1234567890"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Add your contact email" {...field} />
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
          {testimonialsFields.map(
            (
              testimonial: { testiName: string; testiMsg: string },
              i: number
            ) => (
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
                  value={testimonial.testiName}
                  onChange={(e) => handleTestiInput(e, "testiName", i)}
                />
                <br />
                <Label htmlFor="tesMsg">Message</Label>
                <Textarea
                  id="tesMsg"
                  placeholder="Message by customers"
                  value={testimonial.testiMsg}
                  onChange={(e) => handleTestiInput(e, "testiMsg", i)}
                />
                {i !== 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="top-2 right-2 absolute"
                    onClick={() => handleTestimonialFieldDelete(i)}
                  >
                    <Cross1Icon />
                  </Button>
                )}
              </div>
            )
          )}
          {testimonialsFields.length < 4 && (
            <Button
              variant="outline"
              type="button"
              className={cn(
                "w-full mt-4 rounded-md flex justify-center items-center gap-1"
              )}
              onClick={handleTestimonialFieldAdd}
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
              Add more testimonial fields {`${testimonialsFields.length}/4`}
            </Button>
          )}
        </div>

        <Separator className="bg-foreground/20 h-2" />

        {/* Faq */}
        <div>
          <TypographyH4>Frequently Asked Questions (FAQs)</TypographyH4>
          {faqs.map((faq: { question: string; answer: string }, i: number) => (
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
                value={faq.question}
                onChange={(e) => handleFaqInput(e, "question", i)}
              />
              <br />
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                placeholder="Add your answer"
                value={faq.answer}
                onChange={(e) => handleFaqInput(e, "answer", i)}
              />
              {i !== 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="top-2 right-2 absolute"
                  onClick={() => handleFaqFieldDelete(i)}
                >
                  <Cross1Icon />
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full mt-4 rounded-md flex justify-center items-center gap-1"
            )}
            onClick={handleFaqFieldAdd}
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
            Add more faq fields
          </Button>
        </div>

        <Separator className="bg-foreground/20 h-2" />

        {/* policy */}
        <div>
          <TypographyH4>Policies</TypographyH4>
          {policies.map(
            (policy: { title: string; content: string }, i: number) => (
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
                  value={policy.title}
                  onChange={(e) => handlePolicyInput(e, "title", i)}
                />
                <br />
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter your content"
                  value={policy.content}
                  onChange={(e) => handlePolicyInput(e, "content", i)}
                />
                {i !== 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="top-2 right-2 absolute"
                    onClick={() => handlePolicyFieldDelete(i)}
                  >
                    <Cross1Icon />
                  </Button>
                )}
              </div>
            )
          )}

          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full mt-4 rounded-md flex justify-center items-center gap-1"
            )}
            onClick={handlePolicyFieldAdd}
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
            Add more policy fields
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
export function SettingFields({
  form,
  fieldDetails,
  setFieldDetails,
  formValues,
}: TSettingFields) {
  console.log("fieldDetails", fieldDetails);

  function handleDelField(index: number) {
    setFieldDetails((prev: any[]) => {
      const filter = prev.filter((_, i) => index !== i);
      return filter;
    });
  }

  return (
    <div className="py-4 w-[90%] ml-0 h-full relative">
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
        {fieldDetails.length > 0 &&
          fieldDetails.map((field, i) => (
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
                  Field type - {field?.type.split("-")[1]}
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
                      action="Add field"
                      // fieldDetails={fieldDetails}
                      setFieldDetails={setFieldDetails}
                      actionType="edit"
                      formValues={formValues}
                      index={i}
                    >
                      {/* handling edit */}
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setFieldDetails((prev: any[]) => {
                            //!! Getting avil value and setting in field add dialog input
                            form.setValue(
                              "pageField.fieldType",
                              prev[i]["type"]
                            );
                            form.setValue(
                              "pageField.placeholder",
                              prev[i]["placeholder"]
                            );
                            form.setValue(
                              "pageField.isRequired",
                              prev[i]["required"]
                            );

                            return [...prev];
                          });
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
                        handleDelField(i);
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
                    onClick={() => {
                      setFieldDetails((prev: any[]) => {
                        //!! Getting avil value and setting in field add dialog input
                        form.setValue("pageField.fieldType", prev[i]["type"]);
                        form.setValue(
                          "pageField.placeholder",
                          prev[i]["placeholder"]
                        );
                        form.setValue(
                          "pageField.isRequired",
                          prev[i]["required"]
                        );

                        return [...prev];
                      });
                    }}
                  >
                    <Pencil1Icon />
                  </Button>

                  {/* handling Delete */}
                  <Button
                    type="button"
                    disabled={true}
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      handleDelField(i);
                    }}
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
            // fieldDetails={fieldDetails}
            setFieldDetails={setFieldDetails}
            actionType="create"
            formValues={formValues}
            index={-1}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                // setting dialog input to deafult
                form.setValue("pageField.fieldType", "");
                form.setValue("pageField.placeholder", "");
                form.setValue("pageField.isRequired", false);
              }}
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
                  <Textarea placeholder="Enter your message" {...field} />
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
            name="redirectionUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Redirect to URL</FormLabel>
                <FormDescription>
                  The URL you want the buyer to visit after completing a payment
                </FormDescription>
                <FormControl>
                  <Input placeholder="eg: https://example.com" {...field} />
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
                  <Input placeholder="eg: 123456789012" {...field} />
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
                  <Input placeholder="eg: UA-123456789-1" {...field} />
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
        <div>
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
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch("pageExpiry") && (
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
                            {field.value ? (
                              format(field.value, "PPP")
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
                          selected={field.value}
                          onSelect={field.onChange}
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
                    checked={field.value}
                    onCheckedChange={field.onChange}
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
export function CustomiseFields({ form }: { form: any }) {
  return (
    <div className="py-4 w-[90%] ml-0 h-full relative">
      <TypographyMuted className={cn("font-semibold py-3")}>
        Step 4 of 4
      </TypographyMuted>
      <div className="flex flex-col gap-4 h-full">
        <TypographyH4>Customise your page</TypographyH4>
        <div>TODO: page logo upload</div>

        {/* page owner field */}
        <div>
          <FormField
            control={form.control}
            name="pageOwner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Owner</FormLabel>
                <FormControl>
                  <Input placeholder="eg: layaro.shop" {...field} />
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-start items-center gap-5"
                  >
                    {/* light radio */}
                    <FormItem
                      className={`${
                        field.value === "light" &&
                        "border border-primary w-fit h-fit rounded-md px-3 py-2"
                      }`}
                    >
                      <div className="flex items-center">
                        <FormControl>
                          <RadioGroupItem value="light" className="hidden" />
                        </FormControl>
                        <FormLabel
                          className={`font-normal flex justify-center flex-col items-center gap-2 cursor-pointer ${
                            field.value === "light" && "text-primary"
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
                        field.value === "dark" &&
                        "border border-primary w-fit h-fit rounded-md px-3 py-2"
                      }`}
                    >
                      <div className="flex items-center">
                        <FormControl>
                          <RadioGroupItem value="dark" className="hidden" />
                        </FormControl>
                        <FormLabel
                          className={`font-normal flex justify-center flex-col items-center gap-2 cursor-pointer ${
                            field.value === "dark" && "text-primary"
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
                      color={field.value}
                      onChange={field.onChange}
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
  setFieldDetails,
  children,
  actionType,
  index,
  formValues,
}: TFieldAddEditDialog) => {
  const { setfieldValue }: any = useContext(PageContext);

  function handleDialogAction() {
    if (actionType === "create") {
      setFieldDetails((prev: any) => {
        const newFields = {
          type: form.watch("pageField.fieldType"),
          placeholder: form.watch("pageField.placeholder"),
          required: form.watch("pageField.isRequired"),
        };

        //!! if not filed any value show a tost to please fill value
        if (
          form.getValues("pageField.fieldType") === "" ||
          form.getValues("pageField.placeholder") === ""
        ) {
          showToast(
            "Type & Placeholder is required",
            "If you want to extra fields then please select field type and enter placeholder",
            "Close",
            () => {}
          );
          return [...prev];
        }

        return [...prev, newFields];
      });
    }

    if (actionType === "edit") {
      setFieldDetails((prev: any) => {
        const newFields = [...prev];

        newFields[index]["type"] = form.watch("pageField.fieldType");
        newFields[index]["placeholder"] = form.watch("pageField.placeholder");
        newFields[index]["required"] = form.watch("pageField.isRequired");

        // !! if fields are then no value are set
        if (
          form.getValues("pageField.fieldType") === "" ||
          form.getValues("pageField.placeholder") === ""
        ) {
          return [...prev];
        }

        return [...newFields];
      });

      setfieldValue(formValues);
    }

    setTimeout(() => {
      form.setValue("pageField.fieldType", "");
      form.setValue("pageField.placeholder", "");
      form.setValue("pageField.isRequired", false);
    }, 300);
  }
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
                name="pageField.fieldType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select field type</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                      defaultValue={field.value}
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
                      value={field.value}
                      onChange={(e) => {
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
              name="pageField.isRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(e) => {
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
            onClick={handleDialogAction}
          >
            {action}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PageTabs;
