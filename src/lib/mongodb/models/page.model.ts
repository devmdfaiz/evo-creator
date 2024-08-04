import mongoose, { Schema, Document, Model } from "mongoose";

interface MetaData {
  metaTitle: string;
  metaDesc: string;
  keywords: string;
  seoHashUrl: string;
}

interface AnalyticIds {
  metaPixel?: string;
  googleAnalytics?: string;
}

interface FormInput {
  placeholder?: string;
  required?: boolean;
  type?: string;
}

interface Settings {
  formInputs?: FormInput[];
  buttonText?: string;
  analyticIds?: AnalyticIds;
  thankYouNote?: string;
  pageExpiry?: boolean;
  pageExpiryDate?: Date;
  deactivateSales?: boolean;
}

interface Theme {
  template: string;
  color?: string;
  ownerName?: string;
}

interface Policies {
  policies?: string[];
}

interface Page extends Document {
  metaData: MetaData;
  pageContent: any;
  files: any;
  pageHashUrl: string;
  pagePrice: any;
  pageView: number;
  pageOrders: string[];
  creator: string;
  downloadableFile?: string;
  publishStatus: "private" | "public" | "draft";
  pageId: string;
  policies?: Policies;
  settings?: Settings;
  theme?: Theme;
}

const metaDataSchema: Schema<MetaData> = new Schema({
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

const analyticIdsSchema: Schema<AnalyticIds> = new Schema({
  metaPixel: {
    type: String,
  },
  googleAnalytics: {
    type: String,
  },
});

const formInputsSchema: Schema<FormInput> = new Schema({
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

const settingsSchema: Schema<Settings> = new Schema({
  formInputs: [formInputsSchema],
  buttonText: {
    type: String,
  },
  analyticIds: analyticIdsSchema,
  thankYouNote: String,
  pageExpiry: Boolean,
  pageExpiryDate: Date,
  deactivateSales: Boolean,
});

const themeSchema: Schema<Theme> = new Schema({
  template: {
    type: String,
    required: true,
    default: "light",
  },
  color: {
    type: String,
  },
  ownerName: {
    type: String,
  },
});

const policiesSchema: Schema<Policies> = new Schema({
  policies: [String],
});

const pageSchema: Schema<Page> = new Schema(
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

export const Page: Model<Page> =
  mongoose.models.Page || mongoose.model<Page>("Page", pageSchema);
