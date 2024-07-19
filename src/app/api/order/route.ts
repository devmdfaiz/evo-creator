import connectToDb from "@/lib/mongodb/connection/db";
import { Order } from "@/lib/mongodb/models/order.model";
import { Page } from "@/lib/mongodb/models/page.model";
import razorpay from "@/lib/utils/razorpay/razorpay";
import { NextResponse } from "next/server";
import uniqid from "uniqid";
import { authOptions } from "../../../../AuthOptions";
import { getServerSession } from "next-auth";
import { serverError } from "@/lib/utils/error/errorExtractor";

export async function POST(req: Request) {
  try {
    await connectToDb();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "User is not authenticated. Please log in.", order: null },
        { status: 401 }
      );
    }

    const { sub } = session.user;
    const { data, pageId, priceType } = await req.json();

    if (!pageId) {
      return NextResponse.json(
        {
          message: "Page ID is required.",
          order: null,
          error: "Missing page ID in the request body.",
        },
        { status: 400 }
      );
    }

    const pageDetail = await Page.findOne({ pageId });

    if (!pageDetail) {
      return NextResponse.json(
        {
          message: "Page not found.",
          order: null,
          error: "No page found with the provided ID.",
        },
        { status: 404 }
      );
    }

    const amount =
      priceType === "auctionPrice"
        ? data?.auctionPrice
        : pageDetail?.pagePrice?.price;
    if (!amount) {
      return NextResponse.json(
        {
          message: "Amount is required.",
          order: null,
          error: "Page price or auction price is missing.",
        },
        { status: 400 }
      );
    }

    const receipt = `receipt#${uniqid()}`;
    const orderId = uniqid("order-");

    const rzrOrder = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: receipt,
      notes: { pageId },
    });

    const createdOrder = await Order.create({
      customerInfo: data,
      ofPage: [pageId],
      amount,
      rzrPayOrderId: rzrOrder.id,
      rzrPayEntity: rzrOrder.entity,
      rzrPayStatus: rzrOrder.status,
      owner: sub,
      receipt,
      orderId,
    });

    if (createdOrder) {
      pageDetail.pageOrders.push(createdOrder.orderId);
      await pageDetail.save();
    }

    return NextResponse.json(
      {
        message: "Order created successfully.",
        order: createdOrder,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in creating order:", error);
    const errorMessage = serverError(error);

    return NextResponse.json(
      {
        message:
          "An error occurred while creating the order. Please try again.",
        order: null,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
