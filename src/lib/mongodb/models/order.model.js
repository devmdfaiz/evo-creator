import { formatInTimeZone } from "date-fns-tz";
import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customerInfo: {
      type: Schema.Types.Mixed,
    },
    ofPage: [
      {
        type: String,
        ref: "Page",
      },
    ],
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    rzrPayOrderId: {
      type: String,
    },
    rzrPayPaymentId: {
      type: String,
    },
    rzrPaySignature: {
      type: String,
    },
    rzrPayEntity: {
      type: String,
    },
    rzrPayStatus: {
      type: String,
    },
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    owner: {
      type: String,
      ref: "User",
      required: true
    },
    receipt: String,
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
