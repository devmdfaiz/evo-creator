import mongoose, { Schema, Document } from "mongoose";
import { formatInTimeZone } from "date-fns-tz";
import { format } from "date-fns";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
      default: "/3d-avatar.jpg",
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    pagesCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page", // Reference the Page model name
      },
    ],
    userRole: {
      type: String,
      enum: ["USER", "PARTNER", "ADMIN"],
      default: "USER",
      required: true,
    },
    formattedCreatedAt: String,
    formattedUpdatedAt: String,
    CreatedAtDate: String,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const indiaTimezone = "Asia/Kolkata";
  const formatStringWithTimeZone = "EEE MMM dd yyyy HH:mm:ss (zzzz)";

  if (this.isNew) {
    this.formattedCreatedAt = formatInTimeZone(
      this.createdAt,
      indiaTimezone,
      formatStringWithTimeZone
    );

    this.CreatedAtDate = format(
      this.createdAt,
      "dd/MM/yyyy"
    );
  }

  this.formattedUpdatedAt = formatInTimeZone(
    this.updatedAt,
    indiaTimezone,
    formatStringWithTimeZone
  );

  next();
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
