import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customerInfo: {
      type: Schema.Types.Mixed,
    },
    ofPage: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
    device: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    receipt: String,
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  const indiaTimezone = "Asia/Kolkata";
  const formatString = "EEE MMM dd yyyy HH:mm:ss (zzzz)";

  if (this.isNew) {
    this.formattedCreatedAt = formatInTimeZone(this.createdAt, indiaTimezone, formatString);
  }

  this.formattedUpdatedAt = formatInTimeZone(this.updatedAt, indiaTimezone, formatString);

  next();
});

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
