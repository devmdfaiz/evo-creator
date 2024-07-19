import { Order } from "@/lib/mongodb/models/order.model";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        {
          message: "Order ID is required.",
          orderData: null,
          error: "Order ID is missing in the request.",
        },
        { status: 400 }
      );
    }

    const orderData = await Order.aggregate([
      {
        $match: {
          orderId,
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
          color: { $first: "$pageData.theme.color" },
          theme: { $first: "$pageData.theme.template" },
          downloadableFile: { $first: "$pageData.downloadableFile" },
          thankYouNote: { $first: "$pageData.settings.thankYouNote" },
        },
      },
    ]);

    if (!orderData || orderData.length === 0) {
      return NextResponse.json(
        {
          message: "No order data found for the provided Order ID.",
          orderData: null,
          error: "Order data is empty.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Order data retrieved successfully.",
        orderData,
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
        orderData: null,
        error,
      },
      { status: 500 }
    );
  }
}
