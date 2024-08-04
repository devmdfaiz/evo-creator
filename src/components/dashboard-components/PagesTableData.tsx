"use client";
import * as React from "react";
import {
  CaretSortIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { ColumnDef, Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, downloadImage, generateQR } from "@/lib/utils/utils";
import DataTable from "../global/tables/DataTable";
import Image from "next/image";
import { addDays, format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { z } from "zod";
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

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "@radix-ui/react-icons";
import axios from "axios";
import toast from "react-hot-toast";
import { showToast } from "@/lib/zod/index.zodSchema";
import { clientError } from "@/lib/utils/error/errorExtractor";
import ButtonSpinner from "../global/spinner/ButtonSpinner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TypographyP from "../typography/TypographyP";
import TypographyMuted from "../typography/TypographyMuted";
import { evar } from "@/lib/envConstant";
import { Check, Copy, Plus } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import TypographyH4 from "../typography/TypographyH4";
import { useSession } from "next-auth/react";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DateContext, defaultDate } from "@/context/DateProvider";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Status",
    header: () => {
      return <div className="ml-5">Status</div>;
    },
    cell: ({ row }) => (
      <div
        className={cn(
          "ml-5 capitalize max-w-16 text-center rounded-md py-1 px-1",
          `${
            row?.original?.publishStatus === "public"
              ? "text-green-700 bg-green-700/20 "
              : row?.original?.publishStatus === "private"
              ? "text-red-700 bg-red-700/20"
              : "text-gray-700 bg-gray-700/20"
          }`
        )}
      >{`${
        row?.original?.publishStatus === "public"
          ? "Public"
          : row?.original?.publishStatus === "private"
          ? "Private"
          : "Draft"
      }`}</div>
    ),
  },
  {
    accessorKey: "Image",
    header: () => {
      return <div>Image</div>;
    },
    cell: ({ row }) => {
      console.log(
        "image page table",
        row?.original?.files?.details[0]?.fileData?.uploadedFileUrl
      );

      return (
        <Avatar className="rounded-none">
          <AvatarImage
            src={row?.original?.files?.details[0]?.fileData?.uploadedFileUrl}
            alt="image"
          />
          <AvatarFallback className="rounded-none">
            {(row?.original?.metaTitle).slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column?.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4 capitalize">{row?.original?.metaTitle}</div>
    ),
  },
  {
    accessorKey: "Price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column?.toggleSorting(column?.getIsSorted() === "asc")}
        >
          Price
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priceRow = row?.original?.pagePrice;
      
      const price: string = priceRow.offerDiscountedPrice
        ? priceRow.discountedPrice
        : priceRow.price;

      const amount = parseFloat(price);

      // Format the amount as a INR amount
      const formatted =
        priceRow.priceType === "fixedPrice"
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "INR",
            }).format(amount)
          : "Action Price";

      return <div className="ml-4 lowercase">{formatted}</div>;
    },
  },
  {
    accessorKey: "Date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column?.toggleSorting(column?.getIsSorted() === "asc")}
        >
          Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formated = format(row?.original?.createdAt, "dd-MMM-yyyy");

      return <div className="ml-4">{formated}</div>;
    },
  },
  {
    accessorKey: "Revenue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column?.toggleSorting(column?.getIsSorted() === "asc")}
        >
          Revenue
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row?.original?.totalRevenue);

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="ml-4 font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "Orders",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column?.toggleSorting(column?.getIsSorted() === "asc")}
        >
          Orders
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4 lowercase">{row?.original?.paidOrdersCount}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <PageTableActions row={row} />,
  },
];

function PageTableActions({ row }: { row: Row<any> }) {
  const pageData = row?.original;

  const [isCouponSheetOpen, setIsCouponSheetOpen] = React.useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = React.useState(false);
  const [isPageStatusEditorOpen, setIsPageStatusEditorOpen] =
    React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(pageData?.pageId)}
          >
            Copy page ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsCouponSheetOpen(true);
            }}
          >
            Coupons
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="w-full h-full"
              target="_blank"
              href={`/payment-page/update/${pageData?.pageId}${row.original.pageHashUrl}`}
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="w-full h-full"
              target="_blank"
              href={`/payment-page/update?pageId=${pageData?.pageId}${row.original.seoHashUrl}`}
            >
              Edit seo
            </Link>
          </DropdownMenuItem>
          {pageData?.publishStatus === "public" && (
            <DropdownMenuItem
              onClick={() => {
                setIsPageStatusEditorOpen(true);
              }}
            >
              Un-Publish
            </DropdownMenuItem>
          )}
          {pageData?.publishStatus === "private" && (
            <DropdownMenuItem
              onClick={() => {
                setIsPageStatusEditorOpen(true);
              }}
            >
              Publish
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link className="w-full h-full" href={`/pg/${pageData?.pageId}`}>
              View
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setIsCopyDialogOpen(true);
            }}
          >
            Share
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CouponCreator
        isCouponSheetOpen={isCouponSheetOpen}
        setIsCouponSheetOpen={setIsCouponSheetOpen}
        pageId={pageData?.pageId}
      />

      <LinkCopyDialog
        isCopyDialogOpen={isCopyDialogOpen}
        pageId={pageData?.pageId}
        setIsCopyDialogOpen={setIsCopyDialogOpen}
      />

      <PageStatusEditor
        isPageStatusEditorOpen={isPageStatusEditorOpen}
        pageId={pageData?.pageId}
        setIsPageStatusEditorOpen={setIsPageStatusEditorOpen}
        action={pageData?.publishStatus === "public" ? "private" : "public"}
      />
    </>
  );
}

function PageStatusEditor({
  isPageStatusEditorOpen,
  pageId,
  setIsPageStatusEditorOpen,
  action,
}: {
  isPageStatusEditorOpen: boolean;
  pageId: string;
  setIsPageStatusEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: "private" | "public";
}) {
  const [isChangingStatus, setIsChangingStatus] = React.useState(false);

  const { setReloadPage } = React.useContext(DateContext);

  function handleUnPublish() {
    setIsChangingStatus(true);
    axios
      .post("/api/page/change-page-status", { pageId, action })
      .then((res) => {
        const { data, status } = res;

        if (status === 200) {
          setIsChangingStatus(false);
          setIsPageStatusEditorOpen(false);
          setReloadPage((prev: boolean) => !prev);
        }
      })
      .catch((error) => {
        const errorMessage = clientError(error);

        showToast(errorMessage, null, "Close", () => {});
      })
      .finally(() => {
        setIsChangingStatus(false);
      });
  }

  return (
    <AlertDialog
      open={isPageStatusEditorOpen}
      onOpenChange={setIsPageStatusEditorOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {action === "private"
              ? "Are you sure you want to un-publish this payment page? This action will make the page private and it will no longer be accessible to the public."
              : "Are you sure you want to publish this payment page? This action will make the page public and it will be accessible to everyone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!isChangingStatus ? (
            <>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={handleUnPublish}>
                {action === "private" ? "Un-Publish" : "Make Public"}
              </Button>
            </>
          ) : (
            <ButtonSpinner />
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const formSchema = z.object({
  code: z
    .string()
    .min(2, { message: "Code name at least 2 character" })
    .max(10, { message: "Code name at most 10 character" }),
  discount: z
    .string({ required_error: "Discount is required" })
    .min(1)
    .max(100),
  expiry: z.date({ required_error: "Expiry date is required" }),
});

export const CouponCreator = ({
  isCouponSheetOpen,
  setIsCouponSheetOpen,
  pageId,
}: {
  isCouponSheetOpen: boolean;
  setIsCouponSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pageId: string;
}) => {
  const [isCouponSubmitting, setIsCouponSubmitting] = React.useState(false);
  const [coupons, setCoupons] = React.useState<any[]>([]);
  const [isCouponLoading, setIsCouponLoading] = React.useState(false);
  const [isCouponDialogOpen, setIsCouponDialogOpen] = React.useState(false);
  const [isCouponDeleting, setIsCouponDeleting] = React.useState({
    isDeleting: false,
    index: -1,
  });
  const { data, status } = useSession();

  React.useMemo(() => {
    setIsCouponLoading(true);
    if (status === "authenticated" && isCouponSheetOpen) {
      axios
        .post("/api/coupons", { pageId })
        .then((res) => {
          const { data, status: axiosStatus } = res;

          if (axiosStatus === 200) {
            setCoupons(data.coupons);
          }
        })
        .catch((error) => {
          const errorMessage = clientError(error);
          setCoupons(["nothing"]);
          showToast(errorMessage, null, "Close", () => {});
        })
        .finally(() => {
          setIsCouponLoading(false);
        });
    }
  }, [status, isCouponSheetOpen]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      discount: "",
      expiry: addDays(new Date(), 2),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCouponSubmitting(true);
    axios
      .post("/api/create-coupon", { ...values, pageId })
      .then((res) => {
        const { data, status } = res;

        if (status === 201) {
          showToast(
            "Coupon successfully created!",
            "Your new discount is now available for use.",
            "Close",
            () => {}
          );

          setCoupons((prev: any[]) => {
            const newData = [...prev, data.coupon];

            return newData;
          });
        }
      })
      .then(() => {
        setIsCouponDialogOpen(false);
        setIsCouponSubmitting(false);
      })
      .catch((error) => {
        const errorMessage = clientError(error);
        showToast(errorMessage, null, "Close", () => {});
      });
  }

  function handleCouponDelete(couponId: string, index: number) {
    setIsCouponDeleting({ isDeleting: true, index });
    axios
      .post("/api/coupons/delete", { id: couponId })
      .then((res) => {
        const { data, status: axiosStatus } = res;

        if (axiosStatus === 200) {
          showToast(data.message, null, "Close", () => {});
          setCoupons((prev: any[]) => {
            const filter = prev.filter((_, i) => i !== index);

            return filter;
          });
        }
      })
      .catch((error) => {
        const errorMessage = clientError(error);
        showToast(errorMessage, null, "Close", () => {});
      })
      .finally(() => {
        setIsCouponDeleting({ isDeleting: false, index: -1 });
      });
  }

  return (
    <>
      {/* Coupon display sheet */}
      <Sheet open={isCouponSheetOpen} onOpenChange={setIsCouponSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Available Coupons</SheetTitle>
            <SheetDescription>
              Manage your coupons below. You can delete any coupon if needed.
            </SheetDescription>
          </SheetHeader>
          {/* Coupon List here */}

          <ScrollArea className="w-full h-[calc(100vh-180px)]">
            <>
              {coupons[0] === "nothing" && (
                <div className="w-full h-[calc(100vh-120px)] flex items-center justify-center relative">
                  <TypographyP>No coupons found for the this page.</TypographyP>
                </div>
              )}
            </>

            {!isCouponLoading ? (
              <>
                {coupons.length > 0 &&
                  coupons[0] !== "nothing" &&
                  coupons.map((coupon, i) => {
                    const presentDate = new Date();
                    let couponStatus;
                    if (
                      presentDate.getTime() >= new Date(coupon.expiry).getTime()
                    ) {
                      couponStatus = "Expired";
                    } else {
                      couponStatus = "Valid";
                    }

                    return (
                      <div
                        key={i}
                        className="flex gap-3 items-center justify-center border w-full h-fit rounded-md px-4 py-2 mt-3"
                      >
                        <div className="grow">
                          <TypographyH4 className="text-base">
                            {coupon.code}{" "}
                            <span
                              className={`font-light text-sm w-fit h-full py-1 px-3 rounded-md ${
                                couponStatus === "Expired"
                                  ? "bg-red-700/20 text-red-700"
                                  : "bg-green-700/20 text-green-700"
                              }`}
                            >
                              {couponStatus}
                            </span>
                          </TypographyH4>
                          <TypographyMuted className="text-xs">
                            <b>Discount:</b> {coupon.discount}%
                          </TypographyMuted>
                          <TypographyMuted className="text-xs">
                            <b>Created At:</b>{" "}
                            {format(coupon.createdAt, "dd-MMM-yyyy")}
                          </TypographyMuted>
                          <TypographyMuted className="text-xs">
                            <b>Expiry:</b>{" "}
                            {format(coupon.expiry, "dd-MMM-yyyy")}
                          </TypographyMuted>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            handleCouponDelete(coupon._id, i);
                          }}
                        >
                          {!isCouponDeleting.isDeleting ? (
                            <TrashIcon className="w-4 h-4" />
                          ) : (
                            <>
                              {isCouponDeleting.index === i ? (
                                <ButtonSpinner className="w-4 h-4" />
                              ) : (
                                <TrashIcon className="w-4 h-4" />
                              )}
                            </>
                          )}
                        </Button>
                      </div>
                    );
                  })}
              </>
            ) : (
              <ButtonSpinner PClassName="mt-3 w-full flex items-center justify-center" />
            )}
          </ScrollArea>
          <div className="flex items-center justify-center h-fit w-full mt-4">
            <Button
              className="rounded-full p-3 w-fit h-fit"
              onClick={() => {
                setIsCouponDialogOpen(true);
              }}
            >
              {" "}
              <Plus />{" "}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Coupon creator dialog */}
      <Dialog open={isCouponDialogOpen} onOpenChange={setIsCouponDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a New Discount Coupon</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new coupon code for your
              customers. Make sure to set the discount percentage and expiry
              date accurately.
            </DialogDescription>
          </DialogHeader>
          {/* Coupon form here */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., DESC50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount %</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiry"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>When does the coupon expire?</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isCouponSubmitting ? (
                <Button type="submit">Create Coupon</Button>
              ) : (
                <ButtonSpinner />
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const LinkCopyDialog = ({
  isCopyDialogOpen,
  setIsCopyDialogOpen,
  pageId,
}: {
  isCopyDialogOpen: boolean;
  setIsCopyDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pageId: string;
}) => {
  const [isLinkCopied, setIsLinkCopied] = React.useState(false);
  const [qrCodeUrl, setQrCodeUrl] = React.useState("#");

  const pageUrl = `${evar.domain}/pg/${pageId}`;

  generateQR(pageUrl, setQrCodeUrl);

  return (
    <Dialog open={isCopyDialogOpen} onOpenChange={setIsCopyDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Copy Your Unique Page Link</DialogTitle>
          <DialogDescription>
            Use the link below to share your page with others. Click the copy
            button to copy the link to your clipboard.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 items-center justify-between">
          <div className="flex gap-2">
            <div className="py-[7px] px-3 border-2 rounded-md">
              <TypographyP className="text-sm">{`${evar.domain}/pg/${pageId}`}</TypographyP>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                navigator.clipboard
                  .writeText(`${evar.domain}/pg/${pageId}`)
                  .then(() => {
                    setIsLinkCopied(true);

                    setTimeout(() => {
                      setIsLinkCopied(false);
                    }, 2000);
                  })
              }
            >
              {!isLinkCopied ? (
                <Copy className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex gap-1 flex-col">
            <span>
              or{" "}
              <Button
                variant="link"
                onClick={() => {
                  downloadImage(qrCodeUrl, "page-qr-code");
                }}
                className="p-0"
              >
                download
              </Button>{" "}
              me
            </span>
            <img src={qrCodeUrl} alt="page qr-code" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function PagesTableData({ pages }: { pages: any }) {
  return <DataTable data={pages} columns={columns} />;
}
