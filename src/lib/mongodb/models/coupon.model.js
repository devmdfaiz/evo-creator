const couponSchema = new Schema({
  name: String,
  discount: Number,
  discountType: {
    type: String,
    enum: ["regular", "percentage"],
  },
  expiry: {
    type: Date,
  },
  ofPage:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page",
  }
},  { timestamps: true });

couponSchema.pre("save", function (next) {
  const indiaTimezone = "Asia/Kolkata";
  const formatString = "EEE MMM dd yyyy HH:mm:ss (zzzz)";

  if (this.isNew) {
    this.formattedCreatedAt = formatInTimeZone(this.createdAt, indiaTimezone, formatString);
  }

  this.formattedUpdatedAt = formatInTimeZone(this.updatedAt, indiaTimezone, formatString);

  next();
});

export const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
