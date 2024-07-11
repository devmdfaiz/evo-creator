"use client";
// This is header for dashboard pages
import ModeToggle from "../global/ThemeToggle";
import TypographyH3 from "../typography/TypographyH3";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavBar from "./NavBar";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Landmark, LogOut, Pencil, User } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

import axios from "axios";

import toast from "react-hot-toast";
import { clientError } from "@/lib/utils/error/errorExtractor";
import ButtonSpinner from "../global/spinner/ButtonSpinner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { evar } from "@/lib/envConstant";
import {
  BUSINESS_CATEGORY,
  BUSINESS_TYPE,
  COUNTRY_LIST,
} from "@/lib/constants/index.constant";
import { bankFormSchema, showToast } from "@/lib/zod/index.zodSchema";
import { Session } from "next-auth";
import Image from "next/image";
import { storageClient } from "@/lib/utils/appwrite/appwriteClient";

const DashBoardHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data, status } = useSession();

  console.log("header user", data);

  const [isBankSheet, setIsBankSheet] = useState(false);
  const [isProfileSheet, setIsProfileSheet] = useState(false);

  return (
    <header className="py-3 px-5 md:px-10 border-b border-border flex justify-between items-center bg-card shadow">
      <div onClick={() => setIsMenuOpen(true)} className="lg:hidden">
        <HamburgerMenuIcon className="w-5 h-5" />
      </div>
      <div className="flex items-center justify-center gap-5">
        <TypographyH3>{evar.projectName}</TypographyH3>
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      <div className="flex gap-3 items-center">
        <ModeToggle />

        {status === "authenticated" ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-9 h-9 cursor-pointer">
                  <AvatarImage
                    className="object-cover"
                    src={data.user!.avatarUrl!}
                    alt={data.user!.name!}
                  />
                  <AvatarFallback>
                    {data.user!.name!.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                  <Button
                    className="p-2 w-full h-full justify-start"
                    variant={"ghost"}
                    onClick={() => {
                      setIsProfileSheet(true);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <Button
                    className="w-full h-full justify-start p-2"
                    variant={"ghost"}
                    onClick={() => {
                      setIsBankSheet(true);
                    }}
                  >
                    <Landmark className="mr-2 h-4 w-4" />
                    <span>Bank Account</span>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : status === "loading" ? (
          <Skeleton className="h-8 w-8 rounded-full" />
        ) : null}
      </div>

      {/* Banking fields sheet */}
      <BankDetails isBankSheet={isBankSheet} setIsBankSheet={setIsBankSheet} />

      {/* Profile filed sheet */}
      {status === "authenticated" && (
        <ProfileDetails
          isProfileSheet={isProfileSheet}
          setIsProfileSheet={setIsProfileSheet}
          userData={data}
        />
      )}
    </header>
  );
};

async function handleProfileUpload(
  e: ChangeEvent<HTMLInputElement>,
  setIsProfileUploading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    setIsProfileUploading(true);
    if (e.target.files) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);

      // Upload the file to Appwrite
      const uploadResponse = await axios.post("/api/appwrite/upload", formData);
      const { data, status } = uploadResponse;
      const appwriteFileId = data.fileResponse.$id;

      if (status === 201) {
        const view = storageClient.getFileView(
          evar.appwriteBucketId,
          appwriteFileId
        );
        const appwriteFileUrl = view.href;

        // Update the profile picture in your user database
        const profileResponse = await axios.post(
          "/api/user/profile/edit/profile-picture",
          {
            avatarId: appwriteFileId,
            avatarUrl: appwriteFileUrl,
          }
        );

        const {
          status: profileStatus,
          data: { message, user },
        } = profileResponse;

        if (profileStatus === 200) {
          const payload = user;

          // Re-authenticate the user to update the session
          await signIn("credentials", {
            redirect: false,
            ...payload,
            ...payload.avatar,
          });

          showToast(message, null, "Close", () => {});
        }
      }
    }
  } catch (error) {
    const errorMessage = clientError(error);
    showToast(errorMessage, null, "Close", () => {});
  } finally {
    setIsProfileUploading(false);
  }
}

export const ProfileDetails = ({
  isProfileSheet,
  setIsProfileSheet,
  userData,
}: {
  isProfileSheet: boolean;
  userData: Session | null;
  setIsProfileSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  const [isProfileUploading, setIsProfileUploading] = useState(false);

  const profileFormSchema = z.object({
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
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullname: userData?.user?.name,
      email: userData?.user?.email,
      phone: userData?.user?.phone,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsSubmitting(true);
    toast
      .promise(axios.post("/api/user/profile/edit", values), {
        loading: "Updating your profile information. Please wait...",
        success:
          "Profile information updated successfully! Your changes have been saved.",
        error:
          "Failed to update profile information. Please try again or contact support if the issue persists.",
      })
      .then((res) => {
        const {
          status,
          data: { message, user },
        } = res;

        if (status === 200) {
          const payload = user;

          signIn("credentials", {
            redirect: false,
            ...payload,
            ...payload.avatar,
          });
          showToast(message, null, "Close", () => {});
        }
      })
      .then(() => {
        setIsSubmitting(false);
      })
      .catch((error) => {
        const errorMessage = clientError(error);
        showToast(
          `Error: ${errorMessage}. Please try again or contact support if the issue persists.`,
          null,
          "Close",
          () => {}
        );
      });
  }

  return (
    <Sheet open={isProfileSheet} onOpenChange={setIsProfileSheet}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {/* Profile details are here */}
        <div className="flex items-center justify-start gap-2">
          <div className="overflow-hidden w-14 h-14 rounded-full mb-2 mt-4">
            <label
              onMouseEnter={() => {
                setIsMouseHovered(true);
              }}
              onMouseLeave={() => {
                setIsMouseHovered(false);
              }}
              htmlFor="profileInput"
              className="h-full w-full relative grow"
            >
              <Avatar className="w-full h-full cursor-pointer">
                <AvatarImage
                  className="object-cover"
                  src={userData!.user!.avatarUrl!}
                  alt="profile"
                />
                <AvatarFallback>
                  {userData?.user.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>

              {isMouseHovered && (
                <div className="absolute bg-primary/30 inset-0 flex justify-center items-center cursor-pointer">
                  <Pencil className="w-5 h-5" />
                </div>
              )}
            </label>

            <input
              className="hidden"
              type="file"
              id="profileInput"
              onChange={(e) => {
                handleProfileUpload(e, setIsProfileUploading);
              }}
            />
          </div>

          {isProfileUploading && <ButtonSpinner className="w-3 h-3" />}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* name */}
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Md Faizan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., faizan@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isSubmitting ? (
              <ButtonSpinner />
            ) : (
              <Button type="submit">Save Changes</Button>
            )}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export const BankDetails = ({
  isBankSheet,
  setIsBankSheet,
}: {
  isBankSheet: boolean;
  setIsBankSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isKycSubmitting, setIsKycSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof bankFormSchema>>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      businessName: "",
      accountNumber: "",
      beneficiaryName: "",
      ifscCode: "",
      pan: "",
      businessCategory: "",
      businessType: "",
      addressLine: "",
      city: "",
      country: "",
      pinCode: "",
      state: "",
      subBusinessCategory: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof bankFormSchema>) {
    console.log("values", values);

    setIsKycSubmitting(true);
    toast
      .promise(axios.post("/api/razorpay/account", values), {
        loading: "Submitting kyc detail...",
        success: "Kyc detail submitted successfully!",
        error: "Failed to submit detail. Please try again.",
      })
      .then((res) => {
        const { data, status } = res;

        if (status === 200) {
          setIsKycSubmitting(false);
          setIsBankSheet(false);
        }
      })
      .catch((error) => {
        const errorMessage = clientError(error);
        setIsKycSubmitting(false);
      });
  }

  return (
    <Sheet open={isBankSheet} onOpenChange={setIsBankSheet}>
      <SheetContent>
        <SheetHeader className="py-2">
          <SheetTitle>Complete Your KYC</SheetTitle>
          <SheetDescription>
            Please provide the payment details below to complete your KYC.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <ScrollArea className="w-full h-[calc(100vh-180px)] pr-4">
              {/* Business Name */}
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Acme Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Type*/}
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>Business Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a business type to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BUSINESS_TYPE.map((businessType, i) => (
                          <SelectItem key={i} value={businessType.value}>
                            {businessType.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Category*/}
              <FormField
                control={form.control}
                name="businessCategory"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>Business Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a business category to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={BUSINESS_CATEGORY.value}>
                          {BUSINESS_CATEGORY.text}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Sub Business Category*/}
              <FormField
                control={form.control}
                name="subBusinessCategory"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>Sub Business Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a sub-business category to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BUSINESS_CATEGORY.subcategories.map(
                          (subCategory, i) => (
                            <SelectItem key={i} value={subCategory.value}>
                              {subCategory.text}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Account Number */}
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>Bank Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* IFSC Code */}
              <FormField
                control={form.control}
                name="ifscCode"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>IFSC Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., UBIN0123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Beneficiary Name */}
              <FormField
                control={form.control}
                name="beneficiaryName"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>Beneficiary Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Md Faizan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PAN */}
              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>PAN Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., ABCDE1234F" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* address line */}
              <FormField
                control={form.control}
                name="addressLine"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>Address Line</FormLabel>
                    <FormControl>
                      <Textarea placeholder="write here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* city */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Basti" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* pincode */}
              <FormField
                control={form.control}
                name="pinCode"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>Pin code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 271313" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={COUNTRY_LIST.value}>
                          {COUNTRY_LIST.country}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*State*/}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a state to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COUNTRY_LIST.states.map((state, i) => (
                          <SelectItem value={state.text}>
                            {state.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ScrollArea>

            {isKycSubmitting === true ? (
              <div className="py-3">
                <ButtonSpinner />
              </div>
            ) : (
              <div className="py-3 border-t-2 ">
                <Button className="w-full" type="submit">
                  Submit KYC Details
                </Button>
              </div>
            )}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default DashBoardHeader;
