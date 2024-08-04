import { evar } from "@/lib/envConstant";
import connectToDb from "@/lib/mongodb/connection/db";
import { Order } from "@/lib/mongodb/models/order.model";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Wallet } from "@/lib/mongodb/models/wallet.model";

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to get raw body as a buffer
async function getRawBody(req: Request): Promise<Buffer> {
  const chunks = [];
  const reader = req.body?.getReader();

  if (!reader) {
    throw new Error("ReadableStream is null");
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}

// Verify Cashfree signature
function verifySignature({
  timestamp,
  rawBody,
}: {
  timestamp: string;
  rawBody: string;
}) {
  const body = timestamp + rawBody;
  const genSignature = crypto
    .createHmac("sha256", evar.cashfreeSecretKey)
    .update(body)
    .digest("base64");
  return genSignature;
}

export async function POST(req: Request) {
  try {
    // Establish a database connection
    await connectToDb();

    const rawBodyBuffer = await getRawBody(req);
    const rawBody = rawBodyBuffer.toString("utf8");
    const cashfreeWebhookResponse = JSON.parse(rawBody);

    console.log("cashfreeWebhookResponse", cashfreeWebhookResponse);

    const requestHeader = new Headers(req.headers);
    const signature = requestHeader.get("x-webhook-signature");
    const timestamp = requestHeader.get("x-webhook-timestamp");

    if (!rawBody || !signature || !timestamp) {
      console.log("Webhook verification data is missing");

      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const generatedSignature = verifySignature({ timestamp, rawBody });
    const isSignatureVerified = generatedSignature === signature;

    if (!isSignatureVerified) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 400 }
      );
    }

    const paymentStatus = cashfreeWebhookResponse.data.payment.payment_status;
    const customerId =
      cashfreeWebhookResponse.data.customer_details.customer_id;
    const paymentMethod = cashfreeWebhookResponse.data.payment.payment_group;

    // Function to update order
    const updateOrder = async (updateData: any) => {
      const order = await Order.findOneAndUpdate({ customerId }, updateData, {
        new: true,
      });

      if (order) {
        const wallet = await Wallet.findOne({ owner: order.owner });

        const newTransaction = {
          amount: order.amountToPay,
          type: "credit",
          status: paymentStatus,
        };

        if (wallet && wallet.transactions) {
          wallet.transactions.push(newTransaction);
          if (
            newTransaction.status === "SUCCESS" &&
            newTransaction.type === "credit"
          ) {
            wallet.balance += newTransaction.amount;
          }
          await wallet.save();
        }
      }
    };

    // Handle different webhook types
    if (cashfreeWebhookResponse.type === "PAYMENT_SUCCESS_WEBHOOK") {
      await updateOrder({ paymentMethod, paymentStatus, isPaid: true });
    } else if (
      cashfreeWebhookResponse.type === "PAYMENT_USER_DROPPED_WEBHOOK"
    ) {
      await updateOrder({ paymentMethod, paymentStatus });
    } else if (cashfreeWebhookResponse.type === "PAYMENT_FAILED_WEBHOOK") {
      const errorDescription =
        cashfreeWebhookResponse.data.error_details.error_description;
      const errorDescriptionRaw =
        cashfreeWebhookResponse.data.error_details.error_description_raw;
      const error = { errorDescription, errorDescriptionRaw };
      await updateOrder({ paymentMethod, paymentStatus, error });
    }

    // Return a success response
    return NextResponse.json(
      {
        message: "Webhook handled successfully.",
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    const errorMessage = serverError(error);

    return NextResponse.json(
      {
        message: errorMessage,
        error,
      },
      { status: 500 }
    );
  }
}
