import mongoose, { Document, Model, Schema } from "mongoose";

interface Transaction extends Document {
  amount: number;
  type: "credit" | "debit";
  status: "USER_DROPPED" | "SUCCESS" | "FAILED" | "ACTIVE";
}

const TransactionSchema: Schema<Transaction> = new Schema(
  {
    amount: { type: Number, required: true },
    type: { type: String, enum: ["credit", "debit"], required: true },
    status: {
      type: String,
      enum: ["USER_DROPPED", "SUCCESS", "FAILED", "ACTIVE"],
      default: "ACTIVE",
      required: true,
    },
  },
  { timestamps: true }
);

interface Wallet extends Document {
  name: string;
  phone: number;
  walletId: string;
  owner: string;
  balance: number;
  transactions: Transaction[];  // Ensure this is always an array
}

const WalletSchema: Schema<Wallet> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    walletId: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      ref: "User",
      required: true,
    },
    balance: { type: Number, default: 0 },
    transactions: {
      type: [TransactionSchema],
      default: [],  // Initialize as an empty array
    },
  },
  { timestamps: true }
);

export const Wallet: Model<Wallet> =
  mongoose.models.Wallet || mongoose.model<Wallet>("Wallet", WalletSchema);
