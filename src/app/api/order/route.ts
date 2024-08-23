import connectToDb from "@/lib/mongodb/connection/db";
import { Order } from "@/lib/mongodb/models/order.model";
import { Page } from "@/lib/mongodb/models/page.model";
import { NextResponse } from "next/server";
import uniqid from "uniqid";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { evar } from "@/lib/envConstant";
import { Cashfree } from "cashfree-pg";
import initiateCashfree from "@/lib/utils/cashfree/cashfree";
import { separateFivePercent } from "@/lib/utils/utils";

export async function POST(req: Request) {
  try {
    await connectToDb();

    initiateCashfree();

    const { data, pageId } = await req.json();

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
      pageDetail.pagePrice.priceType === "auctionPrice"
        ? data.auctionPrice
        : pageDetail.pagePrice.offerDiscountedPrice
        ? pageDetail.pagePrice.discountedPrice
        : pageDetail.pagePrice.price;

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
    const customerId = uniqid("customer-");

    const cfPayload = {
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId,
        customer_name: data["Full Name"],
        customer_email: data["Email"],
        customer_phone: data["Phone Number"],
      },
      order_meta: {
        return_url: `${evar.domain}/thank-you?order-id=${orderId}`,
      },
    };

    const cashfreeOrderData = await Cashfree.PGCreateOrder(
      "2023-08-01",
      cfPayload
    );

    const { remainingAmount: amountToPay } = separateFivePercent(amount);

    const createdOrder = await Order.create({
      customerInfo: data,
      customerId,
      ofPage: [pageId],
      amount,
      amountToPay,
      cashfreeOrderId: cashfreeOrderData.data.cf_order_id,
      cashfreeOrderEntity: cashfreeOrderData.data.entity,
      cashfreePaymentSessionId: cashfreeOrderData.data.payment_session_id,
      paymentStatus: cashfreeOrderData.data.order_status,
      owner: pageDetail.creator,
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
