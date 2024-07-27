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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "User Id",
    header: () => {
      return <div className="ml-5">User Id</div>;
    },
    cell: ({ row }) => (
      <div className={cn("ml-5 max-w-16 text-center rounded-md py-1 px-1")}>
        <p className="capitalize">{row?.original?.userId}</p>
      </div>
    ),
  },
  {
    accessorKey: "User Roll",
    header: () => {
      return <div className="ml-5">User Roll</div>;
    },
    cell: ({ row }) => (
      <div
        className={cn(
          "ml-5 capitalize text-center rounded-md py-1 px-2 w-fit",
          `${
            row?.original?.userRole === "USER"
              ? "text-green-700 bg-green-700/20"
              : "text-gray-700 bg-gray-700/20"
          }`
        )}
      >
        <p className="capitalize">{row?.original?.userRole}</p>
      </div>
    ),
  },
  {
    accessorKey: "Account Status",
    header: () => {
      return <div className="ml-5">Account Status</div>;
    },
    cell: ({ row }) => (
      <div
        className={cn(
          "ml-5 capitalize text-center rounded-md py-1 px-2 w-fit",
          `${
            row?.original?.accountStatus === "ACTIVE"
              ? "text-green-700 bg-green-700/20"
              : "text-red-700 bg-red-700/20"
          }`
        )}
      >
        <p className="capitalize">{row?.original?.accountStatus}</p>
      </div>
    ),
  },

  {
    accessorKey: "Profile",
    header: () => {
      return <div>Profile</div>;
    },
    cell: ({ row }) => {
      return (
        <Avatar className="rounded-full">
          <AvatarImage src={row?.original?.avatar?.avatarUrl} alt="profile" />
          <AvatarFallback className="rounded-full">
            {(row?.original?.fullname).slice(0, 1)}
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
      <div className="ml-4 capitalize">{row?.original?.fullname}</div>
    ),
  },
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column?.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-4">{row?.original?.email}</div>,
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
      const formatted = format(row?.original?.createdAt, "dd-MMM-yyyy");

      return <div className="ml-4">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <UserTableAction row={row} />,
  },
];

function UserTableAction({ row }: { row: Row<any> }) {
  const userData = row?.original;

  const [isBlockingDialogOpen, setIsBlockingDialogOpen] = React.useState(false);

  const [isPermissionChangingDialogOpen, setIsPermissionChangingDialogOpen] =
    React.useState(false);

  const userId = userData?.userId;
  const roll = userData?.userRole;
  const accountStatus = userData?.accountStatus;

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
            onClick={() => navigator.clipboard.writeText(userId)}
          >
            Copy user ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              className="w-full h-full"
              href={`/admin/search-pages?page=${userId}`}
            >
              View {"user's"} pages
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="w-full h-full"
              href={`/admin/search-orders?order=${userId}`}
            >
              View {"user's"} orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsPermissionChangingDialogOpen(true);
            }}
          >
            Change user permission
          </DropdownMenuItem>
          {accountStatus === "ACTIVE" && (
            <DropdownMenuItem
              onClick={() => {
                setIsBlockingDialogOpen(true);
              }}
            >
              Block user
            </DropdownMenuItem>
          )}

          {accountStatus === "BLOCKED" && (
            <DropdownMenuItem
              onClick={() => {
                setIsBlockingDialogOpen(true);
              }}
            >
              Un-Block user
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <UserPermissionChanger
        isPermissionChangingDialogOpen={isPermissionChangingDialogOpen}
        setIsPermissionChangingDialogOpen={setIsPermissionChangingDialogOpen}
        userId={userId}
        roll={roll}
      />

      <UserBlockingChanger
        isBlockingDialogOpen={isBlockingDialogOpen}
        setIsBlockingDialogOpen={setIsBlockingDialogOpen}
        userId={userId}
        accountStatus={accountStatus}
      />
    </>
  );
}

const UserPermissionChangerFormSchema = z.object({
  roll: z.enum(["USER", "ADMIN"], {
    required_error: "You need to select a user roll.",
  }),
});

function UserPermissionChanger({
  isPermissionChangingDialogOpen,
  userId,
  setIsPermissionChangingDialogOpen,
  roll,
}: {
  isPermissionChangingDialogOpen: boolean;
  userId: string;
  setIsPermissionChangingDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  roll: "USER" | "ADMIN";
}) {
  const [isChangingPermission, setIsChangingPermission] = React.useState(false);

  const form = useForm<z.infer<typeof UserPermissionChangerFormSchema>>({
    resolver: zodResolver(UserPermissionChangerFormSchema),
    defaultValues: {
      roll: roll,
    },
  });

  const { setReloadPage } = React.useContext(DateContext);

  function handlePermissionChange(
    data: z.infer<typeof UserPermissionChangerFormSchema>
  ) {
    setIsChangingPermission(true);
    axios
      .post("/api/admin/user/change-user-permission", {
        userId,
        roll: data.roll,
      })
      .then((res) => {
        const { data, status } = res;

        if (status === 200) {
          setIsChangingPermission(false);
          setIsPermissionChangingDialogOpen(false);
          setReloadPage((prev: boolean) => !prev);
        }
      })
      .catch((error) => {
        const errorMessage = clientError(error);

        showToast(errorMessage, null, "Close", () => {});
      })
      .finally(() => {
        setIsChangingPermission(false);
      });
  }

  return (
    <AlertDialog
      open={isPermissionChangingDialogOpen}
      onOpenChange={setIsPermissionChangingDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select a New Role for This User</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handlePermissionChange)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="roll"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ADMIN" />
                            </FormControl>
                            <FormLabel className="font-normal">Admin</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="USER" />
                            </FormControl>
                            <FormLabel className="font-normal">User</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!isChangingPermission ? (
                  <div className="flex w-full h-fit items-center justify-end">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button>Save Changes</Button>
                  </div>
                ) : (
                  <ButtonSpinner />
                )}
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const UserBlockingFormSchema = z.object({
  status: z.enum(["ACTIVE", "BLOCKED"], {
    required_error: "You need to select a user roll.",
  }),
});

function UserBlockingChanger({
  isBlockingDialogOpen,
  userId,
  setIsBlockingDialogOpen,
  accountStatus,
}: {
  isBlockingDialogOpen: boolean;
  userId: string;
  setIsBlockingDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  accountStatus: "ACTIVE" | "BLOCKED";
}) {
  const [isChangingPermission, setIsChangingPermission] = React.useState(false);

  const form = useForm<z.infer<typeof UserBlockingFormSchema>>({
    resolver: zodResolver(UserBlockingFormSchema),
    defaultValues: {
      status: accountStatus,
    },
  });

  const { setReloadPage } = React.useContext(DateContext);

  function handlePermissionChange(
    data: z.infer<typeof UserBlockingFormSchema>
  ) {
    setIsChangingPermission(true);
    axios
      .post("/api/admin/user/change-user-activity-permission", {
        userId,
        status: data.status,
      })
      .then((res) => {
        const { data, status } = res;

        if (status === 200) {
          setIsChangingPermission(false);
          setIsBlockingDialogOpen(false);
          setReloadPage((prev: boolean) => !prev);
        }
      })
      .catch((error) => {
        const errorMessage = clientError(error);

        showToast(errorMessage, null, "Close", () => {});
      })
      .finally(() => {
        setIsChangingPermission(false);
      });
  }

  return (
    <AlertDialog
      open={isBlockingDialogOpen}
      onOpenChange={setIsBlockingDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update User Status</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handlePermissionChange)}
                className="space-y-6 w-full"
              >
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ACTIVE" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Active
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="BLOCKED" />
                            </FormControl>
                            <FormLabel className="font-normal">Block</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!isChangingPermission ? (
                  <div className="flex w-full h-fit items-center justify-end">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button>Save Changes</Button>
                  </div>
                ) : (
                  <ButtonSpinner />
                )}
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function UsersTableData({
  currentPeriod,
}: {
  currentPeriod: any;
}) {
  return <DataTable data={currentPeriod} columns={columns} />;
}
