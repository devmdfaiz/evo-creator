import mongoose, { Schema, Document } from "mongoose";

const userSchema = new Schema({
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
},  { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
