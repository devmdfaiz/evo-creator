import mongoose, { Schema, Document, Model } from "mongoose";

interface CustomerInfo {
  [key: string]: any;
}

interface Order extends Document {
  customerInfo: CustomerInfo;
  error: CustomerInfo;
  customerId: string;
  paymentMethod?: string;
  ofPage: string[];
  cashfreeOrderId: string;
  cashfreeOrderEntity: string;
  cashfreePaymentSessionId: string;
  paymentStatus: string;
  orderId: string;
  amount: number;
  owner: string;
  amountToPay: number;
  isPaid: boolean;
  receipt?: string;
}

const orderSchema: Schema<Order> = new Schema(
  {
    customerInfo: {
      type: Schema.Types.Mixed,
    },
    error: {
      type: Schema.Types.Mixed,
      default: "no error",
    },
    customerId: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    ofPage: [
      {
        type: String,
        ref: "Page",
      },
    ],
    cashfreeOrderId: {
      type: String,
      required: true,
    },
    cashfreeOrderEntity: {
      type: String,
      required: true,
    },
    cashfreePaymentSessionId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    amountToPay: {
      type: Number,
      required: true,
      default: 0,
    },
    owner: {
      type: String,
      ref: "User",
      required: true,
    },
    receipt: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Order: Model<Order> =
  mongoose.models.Order || mongoose.model<Order>("Order", orderSchema);
