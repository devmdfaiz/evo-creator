import mongoose, { Schema, Document, Model } from 'mongoose';

interface Coupon extends Document {
  code: string;
  discount: number;
  expiry: Date;
  ofPage: string;
  creator: string;
}

const couponSchema: Schema<Coupon> = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    ofPage: {
      type: String,
      ref: 'Page',
      required: true,
    },
    creator: {
      type: String,
      ref: 'Page',
      required: true,
    },
  },
  { timestamps: true }
);

export const Coupon: Model<Coupon> = mongoose.models.Coupon || mongoose.model<Coupon>('Coupon', couponSchema);
