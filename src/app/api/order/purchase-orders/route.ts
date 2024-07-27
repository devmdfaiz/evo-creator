import { Order } from "@/lib/mongodb/models/order.model";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../AuthOptions";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    // Get user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "User is not authenticated. Please log in.",
          error: "User session not found",
          orders: null,
        },
        { status: 401 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          message: "Phone number is required.",
          orderData: null,
          error: "Phone number is missing in the request.",
        },
        { status: 400 }
      );
    }

    const ordersData = await Order.aggregate([
      {
        $match: {
          "customerInfo.Phone Number": phone,
        },
      },
      {
        $match: {
          isPaid: true,
        },
      },
      { $unwind: "$ofPage" },
      {
        $lookup: {
          from: "pages",
          localField: "ofPage",
          foreignField: "pageId",
          as: "pageData",
        },
      },
      { $unwind: "$pageData" },
      {
        $group: {
          _id: "$_id",
          customerInfo: { $first: "$customerInfo" },
          isPaid: { $first: "$isPaid" },
          orderId: { $first: "$orderId" },
          amount: { $first: "$amount" },
          createdAt: { $first: "$createdAt" },
          pageTitle: { $first: "$pageData.metaData.metaTitle" },
          pageDesc: { $first: "$pageData.metaData.metaDesc" },
          pageId: { $first: "$pageData.pageId" },
        },
      },
    ]);

    if (!ordersData || ordersData.length === 0) {
      return NextResponse.json(
        {
          message: "No orders data found for the provided Order ID.",
          orderData: null,
          error: "Orders data is empty.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Order data retrieved successfully.",
        ordersData,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in fetching order data: ", error);
    const errorMessage = serverError(error);

    return NextResponse.json(
      {
        message: errorMessage,
        ordersData: null,
        error,
      },
      { status: 500 }
    );
  }
}
