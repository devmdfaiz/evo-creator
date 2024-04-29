import connectToDb from "@/lib/mongodb/connection/db";
import { Page } from "@/lib/mongodb/models/page.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../AuthOptions";
import mongoose from "mongoose";

export async function GET(req: Request) {
  connectToDb();

  const {
    user: { sub },
  } = await getServerSession(authOptions);

  console.log("iser id", sub);

  try {
    const pages = await Page.aggregate([
      // Match only the pages with orders
      {
        $match: {
          pageOrders: { $exists: true, $ne: [] },
        },
      },
      {
        $match: {
          creator: new mongoose.Types.ObjectId(sub),
        },
      },
      // Unwind the pageOrders array
      { $unwind: "$pageOrders" },
      // Lookup orders for each page
      {
        $lookup: {
          from: "orders",
          localField: "pageOrders",
          foreignField: "_id",
          as: "order",
        },
      },
      // Unwind the order array
      { $unwind: "$order" },
      // Match only paid orders
      {
        $match: {
          "order.isPaid": true,
        },
      },
      // Group by page and sum up the amount for paid orders
      {
        $group: {
          _id: "$_id",
          totalRevenue: { $sum: "$order.amount" },
          paidOrdersCount: { $sum: 1 },
          // Include all other fields from the page document
          metaData: { $first: "$metaData" },
          pagePrice: { $first: "$pagePrice" },
          pageView: { $first: "$pageView" },
          creator: { $first: "$creator" },
          isPublished: { $first: "$isPublished" },
          coupons: { $first: "$coupons" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
    ]);

    return NextResponse.json(
      {
        msg: "Successful",
        error: null,
        pages,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      msg: "Error",
      error,
      pages: null,
    });
  }
}
