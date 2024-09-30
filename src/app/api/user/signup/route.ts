import { evar } from "@/lib/envConstant";
import connectToDb from "@/lib/mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import uniqid from "uniqid";
import SendOtp from "../../../../../emails/otp.email"; // React component to generate OTP email content
import { generateOTP } from "@/lib/otplib/otplib";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { transporter } from "@/lib/nodemailer/nodemailer";
import { render } from "@react-email/components";
import { Wallet } from "@/lib/mongodb/models/wallet.model";
import { resend } from "@/lib/resend/resend";

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectToDb();

    const { fullname, email, password, phone } = await req.json();

    // Generate a new OTP
    const otp = generateOTP();

    // Hash the password for security
    const hashPassword = await bcrypt.hash(password, 10);

    // Generate a unique user ID
    const userId = uniqid("user-");
    const walletId = uniqid("wallet-");

    // Check if a user with the same email or phone already exists
    const existingUserWithEmail = await User.findOne({ email });
    const existingUserWithPhone = await User.findOne({ phone });

    if (existingUserWithEmail && existingUserWithPhone) {
      return NextResponse.json(
        {
          message:
            "This email and phone are already registered. Try signing in or use different details.",
          user: null,
          error: null,
        },
        { status: 409 } // 409 Conflict
      );
    }

    if (existingUserWithEmail) {
      return NextResponse.json(
        {
          message: "Email already in use. Please sign in or use another email.",
          user: null,
          error: null,
        },
        { status: 409 } // 409 Conflict
      );
    }

    if (existingUserWithPhone) {
      return NextResponse.json(
        {
          message:
            "Phone number already in use. Please sign in or use another phone number.",
          user: null,
          error: null,
        },
        { status: 409 } // 409 Conflict
      );
    }

    // Create a new user
    const newUser = await User.create({
      fullname,
      phone,
      email,
      password: hashPassword,
      userId,
    });

    if (!newUser) {
      return NextResponse.json(
        {
          message: "Failed to create user. Please try again.",
          user: null,
          error: null,
        },
        { status: 500 } // 500 Internal Server Error
      );
    }

    // Create wallet
    const createdWallet = await Wallet.create({
      name: fullname,
      phone,
      walletId,
      owner: userId,
    });

    if (!createdWallet) {
      // Rollback user creation if wallet creation fails
      await User.findByIdAndDelete(newUser._id);

      return NextResponse.json(
        {
          message: "Failed to create wallet. Please try again.",
          user: null,
          error: null,
        },
        { status: 500 } // 500 Internal Server Error
      );
    }

    // Send the OTP to a specific email address using the "nodemailer" service

    // handle by resend
    const { data, error } = await resend.emails.send({
      from: "Verification OTP <otp@evocreator.com>",
      to: email,
      subject: `Your One-Time Password (OTP) from ${evar.projectName}`,
      react: SendOtp({
        projectName: evar.projectName,
        recipientName: fullname,
        action: "Sign up",
        otp: generateOTP(),
        supportEmail: "support@evocreator.com",
        baseUrl: evar.domain,
      }),
    });

    console.log("Resend email data: ", data);
    

    if (error) {
      // Rollback user and wallet creation if email sending fails
      await User.findByIdAndDelete(newUser._id);
      await Wallet.findByIdAndDelete(createdWallet._id);

      return NextResponse.json(
        {
          message: "An error occurred in sending email. Please try again.",
          error,
          user: null,
        },
        { status: 500 } // 500 Internal Server Error
      );
    }

    return NextResponse.json(
      {
        message: "Account created successfully!",
        user: newUser,
        error: null,
      },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    const errorMessage = serverError(error);

    return NextResponse.json(
      {
        message: `${errorMessage}. Please try again or contact support.`,
        user: null,
        error: error,
      },
      { status: 500 }
    );
  }
}
