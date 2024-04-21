"use client";

import * as React from "react";
import {
  CaretSortIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
} from "@tanstack/react-table";

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

export type Payment = {
  id: string;
  name: string,
  phone: number,
  amount: number;
  page: string
  isPaid: boolean;
  date: string,
  email?: string;
};

const data: Payment[] = [
  {
    id: "m5gr84i9",
    name: "Md Faizan",
    phone: 9696293133,
    amount: 316,
    page:"ABC",
    date: "12/45/6789",
    isPaid: true,
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    name: "Md Rizwan",
    phone: 7700340934,
    amount: 242,
    page:"ABC",
    date: "12/45/6789",
    isPaid: true,
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    name: "Tarannum Khatoon",
    phone: 7755051658,
    amount: 837,
    page:"ABC",
    date: "12/45/6789",
    isPaid: false,
    email: "Monserrat44@gmail.com",
  },
];
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "isPaid",
    header: () => {
      return (
        <div className="ml-5">
          Status
        </div>
      );
    },
    cell: ({ row }) => (
      <div className={cn("ml-5 capitalize max-w-11 text-center rounded-sm", `${row.getValue("isPaid") ? "text-green-600 bg-green-600/20 " : "text-red-600 bg-red-600/20 max-w-[70px]"}`)}>{`${row.getValue("isPaid") ? "Paid" : "Cancled"}`}</div>
    ),
  },
  {
    accessorKey: "name",
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
    cell: ({ row }) => <div className="ml-4 capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "phone",
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
    cell: ({ row }) => <div className="ml-4 lowercase">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "email",
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
    cell: ({ row }) => <div className="ml-4 lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "page",
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
    cell: ({ row }) => <div className="ml-4 lowercase">{row.getValue("page")}</div>,
  },
  {
    accessorKey: "date",
    header: () => {
      return (
        <div>
          Date
        </div>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
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

export default function OrderDataTable(){
  return <DataTable data={data} columns={columns}/>
}

