import { formatInTimeZone } from "date-fns-tz";
import mongoose, { Schema } from "mongoose";

//?? Meta Data schema starts here
const metaDataSchema = new Schema({
  metaTitle: {
    type: String,
    required: true,
  },
  metaDesc: {
    type: String,
    required: true,
  },
  keywords: {
    type: String,
    required: true,
  },
  seoHashUrl: {
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
  placeholder: {
    type: String,
  },
  required: {
    type: Boolean,
  },
  type: {
    type: String,
  },
});

//?? Settings schema starts here
const settingsSchema = new Schema({
  formInputs: [formInputs],
  buttonText: {
    type: String,
  },
  analyticIds: analyticIdsSchema,
  thankYouNote: String,
  // whatsappSupport: Number,
  pageExpiry: Boolean,
  pageExpiryDate: Date,
  deactivateSales: Boolean,
});

//?? Theme schema starts here
const themeSchema = new Schema({
  template: {
    type: String,
    required: true,
    default: "light",
  },
  color: {
    type: String,
  },
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
    pageContent: {
      type: Schema.Types.Mixed,
    },
    files: {
      type: Schema.Types.Mixed,
    },
    pageHashUrl: {
      type: String,
    },
    pagePrice: {
      type: Schema.Types.Mixed,
    },
    pageView: {
      type: Number,
      required: true,
      default: 0,
    },
    pageOrders: [
      {
        type: String,
        ref: "Order",
      },
    ],
    creator: {
      type: String,
      ref: "User",
      required: true,
    },
    downloadableFile: {
      type: String,
    },
    publishStatus: {
      type: String,
      enum: ["private", "public", "draft"],
      default: "draft",
      required: true,
    },
    pageId: {
      type: String,
      required: true,
      unique: true,
    },
    policies: policiesSchema,
    settings: settingsSchema,
    theme: themeSchema,
  },
  { timestamps: true }
);

export const Page = mongoose.models.Page || mongoose.model("Page", pageSchema);
