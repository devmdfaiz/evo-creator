import connectToDb from "@/lib/mongodb/connection/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../AuthOptions";
import { Order } from "@/lib/mongodb/models/order.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  connectToDb();

  const {
    user: { sub },
  } = await getServerSession(authOptions);

  try {
    const orders = await Order.aggregate([
      {
        $match: {
          owner: new mongoose.Types.ObjectId(sub),
        },
      },
      {
        $unwind: "$ofPage",
      },
      {
        $lookup: {
          from: "pages",
          localField: "ofPage",
          foreignField: "_id",
          as: "pageData",
        },
      },
      {
        $unwind: {
          path: "$pageData",
        },
      },
      {
        $group: {
          _id: "$_id",
          customerInfo: {
            $first: "$customerInfo",
          },
          isPaid: {
            $first: "$isPaid",
          },
          rzrPayOrderId: {
            $first: "$rzrPayOrderId",
          },
          amount: {
            $first: "$amount",
          },
          createdAt: {
            $first: "$createdAt",
          },
          pageId: {
            $first: "$pageData._id",
          },
          pageTitle: {
            $first: "$pageData.metaData.metaTitle",
          },
        },
      },
    ]);

    return NextResponse.json(
      {
        msg: "Orders feched succ",
        orders,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      msg: "Orders feched failed",
      orders: null,
      error,
    });
  }
}
