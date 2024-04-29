import connectToDb from "@/lib/mongodb/connection/db";
import { Order } from "@/lib/mongodb/models/order.model";
import { Page } from "@/lib/mongodb/models/page.model";
import razorpay from "@/lib/utils/razorpay/razorpay";
import { NextResponse } from "next/server";
import uniqid from "uniqid";
import { authOptions } from "../../../../AuthOptions";
import { getServerSession } from "next-auth";

export async function POST(req: Request, res: Response) {
  connectToDb();

  const {
    user: { sub },
  } = await getServerSession(authOptions);

  const { data, pageId, device, priceType } = await req.json();

  try {
    const pageDetail = await Page.findById(pageId);

    if (!pageDetail) {
      return NextResponse.json({ msg: "Page not found!", order: null }, { status: 404 });
    }

    const amount = pageDetail?.pagePrice?.price;
    let createdOrder;

    const auctionPrice = data?.auctionPrice;

    const receipt = `receipt#${uniqid()}`;

    const rzrOrder = await razorpay.orders.create({
      amount: priceType === "auctionPrice" ? auctionPrice : amount * 100,
      currency: "INR",
      receipt: receipt,
      notes: {
        pageId,
      },
    });

    if (pageDetail) {
      createdOrder = await Order.create({
        customerInfo: data,
        ofPage: [pageId],
        amount: priceType === "auctionPrice" ? auctionPrice : amount,
        device,
        rzrPayOrderId: rzrOrder.id,
        rzrPayEntity: rzrOrder.entity,
        rzrPayStatus: rzrOrder.status,
        owner: sub,
        receipt,
      });
    }

    if (createdOrder) {
      pageDetail.pageOrders.push(createdOrder._id);
      await pageDetail.save();
    }

    return NextResponse.json({
      msg: "Order created",
      order: createdOrder,
      status: 200,
    });
  } catch (error) {
    console.log("error in creating order =>", error);
    return NextResponse.json({ msg: error, order: null }, { status: 500 });
  }
}