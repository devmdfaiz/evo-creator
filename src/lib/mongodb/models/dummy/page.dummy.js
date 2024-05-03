const { Schema, default: mongoose } = require("mongoose");
const { type } = require("os");

const pageSchema = new Schema({
  metaData: {
    metaTitle: String,
  },
  pagePrice: {
    type: Number,
    default: 0,
  },
  pageOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DummyOrderData",
    },
  ],
  creator: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const DummyPage =
  mongoose.models.DummyPageData ||
  mongoose.model("DummyPageData", pageSchema);