import mongoose, { Schema } from "mongoose";
import { type } from "os";

//?? Meta Data schema starts here
const metaDataSchema = new Schema({
  metaTitle: {
    type: String,
  },
  metaDesc: {
    type: String,
  },
  keywords: {
    type: String,
    required: true,
  },
});

//?? Aanalytic schema starts here
const analyticIdsSchema = new Schema({
  metaPixel: {
    type: String,
  },
  googleAnalytics: {
    type: String,
  },
});

//?? form inputs
const formInputs = new Schema({
  placeholder: String,
  required: {
    type: Boolean,
    default: false,
  },
  type: String,
});

//?? Settings schema starts here
const settingsSchema = new Schema({
  formInputs: [formInputs],
  redirectUrl: String,
  analyticIds: analyticIdsSchema,
  downloadableFile: String,
  thankYouNote: String,
  whatsappSupport: Number,
  pageExpiry: Boolean,
  pageExpiryDate: Date,
  deactivateSales: Boolean,
});

//?? Theme schema starts here
const themeSchema = new Schema({
  avatar: String,
  name: String,
  template: {
    type: String,
    required: true,
    default: "light",
  },
  color: String,
});

//?? Policies schema starts here
const policiesSchema = new Schema({
  policies: [String],
});

//?? Page schema starts here
const pageSchema = new Schema(
  {
    metaData: {
      type: metaDataSchema,
    },
    //!!: not in use
    // subdomain: {
    //   type: String,
    //   unique: true,
    // },
    pageContent: {
      type: Schema.Types.Mixed,
    },

    pagePrice: {
      type: Schema.Types.Mixed,
    },
    pageView: {
      type: Number,
      required: true,
      default: 0,
    },
    //!!: not in use
    // pageType: {
    //   type: String,
    //   enum: ["simple-page", "with-page-builder"],
    // },
    pageOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coupons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
      },
    ],
    policies: policiesSchema,
    settings: settingsSchema,
    theme: themeSchema,
  },
  { timestamps: true }
);

export const Page = mongoose.models.Page || mongoose.model("Page", pageSchema);
