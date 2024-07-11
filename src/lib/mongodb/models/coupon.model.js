import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema(
  {
    code: String,
    discount: Number,
    expiry: {
      type: Date,
      required: true,
    },
    ofPage: {
      type: String,
      ref: "Page",
      required: true,
    },
    creator: {
      type: String,
      ref: "Page",
      required: true,
    },
  },
  { timestamps: true }
);

// couponSchema.pre("save", function (next) {
//   const indiaTimezone = "Asia/Kolkata";
//   const formatString = "EEE MMM dd yyyy HH:mm:ss (zzzz)";

//   if (this.isNew) {
//     this.formattedCreatedAt = formatInTimeZone(this.createdAt, indiaTimezone, formatString);
//   }

//   this.formattedUpdatedAt = formatInTimeZone(this.updatedAt, indiaTimezone, formatString);

//   next();
// });

export const Coupon =
  mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
