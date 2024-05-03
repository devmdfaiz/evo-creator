const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  customerInfo: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  rzrPayOrderId: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Enforce a minimum order value of 0
  },
  ofPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DummyPageData",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const DummyOrder =
  mongoose.models.DummyOrderData ||
  mongoose.model("DummyOrderData", OrderSchema);
