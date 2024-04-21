"use client";

import * as React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/utils";
import DataTable from "../global/tables/DataTable";
import Image from "next/image";

export type Payment = {
  id: string;
  img: string;
  name: string;
  price: number;
  status: boolean;
  date: string;
  revenue: number;
  customers: number;
};

const data: Payment[] = [
  {
    id: "m5gr84i9",
    img: "https://images.pexels.com/photos/17327094/pexels-photo-17327094/free-photo-of-pac-man-protagonists-cutouts.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "page abc",
    price: 316,
    date: "12/45/6789",
    status: true,
    revenue: 34,
    customers: 23,
  },
  {
    id: "m5w46yejbv",
    img: "https://images.pexels.com/photos/17327094/pexels-photo-17327094/free-photo-of-pac-man-protagonists-cutouts.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "page abc",
    price: 316,
    date: "12/45/6789",
    status: true,
    revenue: 34,
    customers: 23,
  },
  {
    id: "m5grdgyrety",
    img: "https://images.pexels.com/photos/17327094/pexels-photo-17327094/free-photo-of-pac-man-protagonists-cutouts.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "page dfg",
    price: 316,
    date: "12/45/6789",
    status: false,
    revenue: 34,
    customers: 23,
  },
];
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: () => {
      return <div className="ml-5">Status</div>;
    },
    cell: ({ row }) => (
      <div
        className={cn(
          "ml-5 capitalize max-w-16 text-center rounded-sm",
          `${
            row.getValue("status")
              ? "text-green-600 bg-green-600/20 "
              : "text-red-600 bg-red-600/20 max-w-[70px]"
          }`
        )}
      >{`${row.getValue("status") ? "Public" : "Private"}`}</div>
    ),
  },
  {
    accessorKey: "img",
    header: () => {
      return <div>Image</div>;
    },
    cell: ({ row }) => (
      <Image
        src={row.getValue("img")}
        alt="img"
        width={30}
        height={30}
        objectFit="cover"
      />
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
          Name
          <CaretSortIcon className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4 capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4 lowercase">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "date",
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
    cell: ({ row }) => (
      <div className="ml-4 lowercase">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Revenue
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenue"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="ml-4 font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "customers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customers
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4 lowercase">{row.getValue("customers")}</div>
    ),
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
              Copy page ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function PagesTableData() {
  return <DataTable data={data} columns={columns} />;
}
