const analyticIdsSchema = new Schema({
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

export const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", pageSchema);
