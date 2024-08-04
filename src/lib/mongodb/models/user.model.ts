import mongoose, { Schema, Document, Model } from 'mongoose';

interface Avatar {
  avatarId: string;
  avatarUrl: string;
}

interface User extends Document {
  fullname: string;
  phone: number;
  email: string;
  userId: string;
  avatar: Avatar;
  password: string;
  emailVerificationStatus: 'verified' | 'unverified';
  phoneVerificationStatus: 'verified' | 'unverified';
  pagesCreated: mongoose.Types.ObjectId[];
  userRole: 'USER' | 'PARTNER' | 'ADMIN';
  accountStatus: 'ACTIVE' | 'BLOCKED';
}

const userSchema: Schema<User> = new Schema(
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
      avatarId: {
        type: String,
        required: true,
        default: 'default',
      },
      avatarUrl: {
        type: String,
        required: true,
        default: '/3d-avatar.jpg',
      },
    },
    password: {
      type: String,
      required: true,
    },
    emailVerificationStatus: {
      type: String,
      default: 'unverified',
      enum: ['verified', 'unverified'],
      required: true,
    },
    phoneVerificationStatus: {
      type: String,
      default: 'unverified',
      enum: ['verified', 'unverified'],
      required: true,
    },
    pagesCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page', // Reference the Page model name
      },
    ],
    userRole: {
      type: String,
      enum: ['USER', 'PARTNER', 'ADMIN'],
      default: 'USER',
      required: true,
    },
    accountStatus: {
      type: String,
      enum: ['ACTIVE', 'BLOCKED'],
      default: 'ACTIVE',
      required: true,
    },
  },
  { timestamps: true }
);

export const User: Model<User> = mongoose.models.User || mongoose.model<User>('User', userSchema);
