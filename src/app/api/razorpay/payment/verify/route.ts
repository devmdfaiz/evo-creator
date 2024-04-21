import { evar } from "@/lib/envConstant";
import connectToDb from "@/lib/mongodb/connection/db";
import { Order } from "@/lib/mongodb/models/order.model";
import razorpay from "@/lib/utils/razorpay/razorpay";
import { error } from "console";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  connectToDb();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json();

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    await Order.findOneAndUpdate(
      { rzrPayOrderId: razorpay_order_id },
      {
        rzrPayPaymentId: razorpay_payment_id,
        rzrPaySignature: razorpay_signature,
      }
    );

    const generatedSignature = crypto
      .createHmac("sha256", evar.razorpaySec)
      .update(body.toString())
      .digest("hex");

    const isSignatureVerified = generatedSignature === razorpay_signature;

    if (isSignatureVerified) {

      const rzrPayOrderDetail = await razorpay.orders.fetch(razorpay_order_id)
      
      const orderDetail = await Order.findOneAndUpdate(
        { rzrPayOrderId: razorpay_order_id },
        {
          rzrPayPaymentId: razorpay_payment_id,
          rzrPaySignature: razorpay_signature,
          rzrPayStatus: rzrPayOrderDetail.status,
          isPaid: rzrPayOrderDetail.status === "paid" ? true : false,
        }
      );

      return NextResponse.json({
        msg: "Signature is okay",
        isSignatureVerified,
        orderDetail,
        error: false,
      });
    }

    return NextResponse.json({
      msg: "Signature is not verified",
      isSignatureVerified: false,
      orderDetail: null,
      error: false,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "There are an error",
      isSignatureVerified: false,
      orderDetail: null,
      error,
    });
  }
}
