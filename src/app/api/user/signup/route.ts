import { evar } from "@/lib/envConstant";
import connectToDb from "@/lib/mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import { resend } from "@/lib/resend/resend";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import uniqid from "uniqid";
import SendOtp from "../../../../../emails/otp.email"; // React component to generate OTP email content
import { generateOTP } from "@/lib/otplib/otplib";
import { serverError } from "@/lib/utils/error/errorExtractor";

export async function POST(req: Request) {
  // Connect to the database
  await connectToDb();

  const { fullname, email, password, phone } = await req.json();

  // Generate a new OTP
  const otp = generateOTP();

  // Hash the password for security
  const hashPassword = await bcrypt.hash(password, 10);

  // Generate a unique user ID
  const userId = uniqid("user-");

  try {
    // Check if a user with the same email already exists
    const existingUserWithEmail = await User.findOne({ email });

    // Check if a user with the same phone already exists
    const existingUserWithPhone = await User.findOne({ phone });

    if (existingUserWithPhone && existingUserWithEmail) {
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
            "Phone number already in use. Please sign in or use another email.",
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

    if (newUser) {
      // Send the OTP to a specific email address using the "resend" service
      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev", // Sender's email address
        to: email, // Recipient's email address
        subject: `Your One-Time Password (OTP) from ${evar.projectName}`, // Email subject
        react: SendOtp({
          projectName: evar.projectName,
          recipientName: fullname,
          action: "Sign up",
          otp,
          supportEmail: "support@support.com",
          baseUrl: evar.domain,
        }), // React component generating the email content
      });

      // Check if there was an error sending the email
      if (error) {
        return NextResponse.json(
          {
            message: "An error in sending email. Please try again.", // User-friendly error message,
            error, // Return the error object for debugging
          },
          { status: 500 } // HTTP 500 Internal Server Error for unexpected issues
        );
      }
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
