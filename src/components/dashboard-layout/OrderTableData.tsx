"use client";
import {
  CaretSortIcon,
  DotsHorizontalIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/utils";
import DataTable from "../global/tables/DataTable";
import { format } from "date-fns";
import Link from "next/link";
import IconWhatsapp from "../icons/WhatsappIcon";
import { useState } from "react";
import QRCode from "qrcode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const PhoneCell = ({ row }: {row: any}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("#");

  const url = `https://wa.me/+91${row.original.customerInfo["Phone Number"]}`;

  const generateQR = (text: string) => {
    QRCode.toDataURL(text, { version: 7 })
      .then((url: string) => {
        setQrCodeUrl(url);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <div className="ml-4 lowercase flex gap-2 items-center justify-start">
      <span>{row.original.customerInfo["Phone Number"]}</span>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              generateQR(url);
            }}
          >
            <IconWhatsapp className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {row.original.isPaid
                ? "Express your gratitude to your customers."
                : "Encourage the customer to complete their purchase."}
            </DialogTitle>
            <DialogDescription>
              {row.original.isPaid
                ? "Take a moment to express your gratitude to your customers, acknowledging their support and valuing their role in your success."
                : "Encourage the customer to complete their purchase by addressing any concerns and highlighting the benefits of their order."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Link
              href={url}
              target="_blank"
              className="border border-primary rounded-md px-5 py-3 flex gap-2 items-center justify-center bg-primary/20"
            >
              Open on Whatsapp now <ExternalLinkIcon />
            </Link>
            <br />
            <span>or scan me</span>
            <img src={qrCodeUrl} alt="whatsapp qrcode" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Status",
    header: () => {
      return <div className="ml-5">Status</div>;
    },
    cell: ({ row }) => (
      <div
        className={cn(
          "ml-5 capitalize text-center rounded-md py-1 px-1",
          `${
            row.original.isPaid
              ? "text-green-700 bg-green-700/20 "
              : "text-red-700 bg-red-700/20"
          }`
        )}
      >{`${row.original.isPaid ? "Paid" : "Cancled"}`}</div>
    ),
  },
  {
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <CaretSortIcon className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4 capitalize">
        {row.original.customerInfo["Full Name"]}
      </div>
    ),
  },
  {
    accessorKey: "Phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone Number
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <PhoneCell row={row} />,
  },
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4 lowercase">{row.original.customerInfo.Email}</div>
    ),
  },
  {
    accessorKey: "Page",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Page
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4 flex gap-2 items-center justify-start">
        <span>{row.original.pageTitle}</span>
        <Link href={`pg/${row.original.pageId}`} target="_blank">
          <ExternalLinkIcon />
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "Date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formated = format(row.original.createdAt, "dd/MM/yyyy");

      return <div className="ml-4 lowercase">{formated}</div>;
    },
  },
  {
    accessorKey: "Amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.original.amount);

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="ml-4 text-left font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
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
              onClick={() =>
                navigator.clipboard.writeText(payment.rzrPayOrderId)
              }
            >
              Copy order ID
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function OrderDataTable({ currentPeriod }: { currentPeriod: any[] }) {
  return <DataTable data={currentPeriod} columns={columns} />;
}
