import connectToDb from "@/lib/mongodb/connection/db";
import { Order } from "@/lib/mongodb/models/order.model";
import { Page } from "@/lib/mongodb/models/page.model";
import razorpay from "@/lib/utils/razorpay/razorpay";
import { NextResponse } from "next/server";
import uniqid from "uniqid";

export async function POST(req: Request, res: Response) {
  connectToDb();

  const { data, pageId, device, priceType } = await req.json();

  try {
    const pageDetail = await Page.findById(pageId);

    const amount = pageDetail?.pagePrice?.price;
    let createdOrder;

    const auctionPrice = data?.auctionPrice;

    const rzrOrder = await razorpay.orders.create({
      amount: priceType === "auctionPrice" ? auctionPrice : amount * 100,
      currency: "INR",
      receipt: `receipt#${uniqid()}`,
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
    return NextResponse.json({ msg: error, status: 500, order: "" });
  }
}
