import connectToDb from "@/lib/mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { resend } from "@/lib/resend/resend";
import { evar } from "@/lib/envConstant";
import SendOtp from "../../../../../emails/otp.email";
import { generateOTP } from "@/lib/otplib/otplib";
import { serverError } from "@/lib/utils/error/errorExtractor";

export async function POST(req: Request, res: Response) {
  connectToDb();

  const { phone, password } = await req.json();

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return NextResponse.json(
        {
          message: "User does not exist. Please first create an account",
          error: null,
          user: null,
        },
        { status: 404 }
      ); // Set HTTP status code 404 for resource not found
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Please enter correct password",
          user: null,
          error: null,
        },
        { status: 401 }
      ); // Set HTTP status code 401 for unauthorized access
    }

    // Send the OTP to a specific email address using the "resend" service
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Sender's email address
      to: user.email, // Recipient's email address
      subject: "Your One-Time Password (OTP) from The Dream Project", // Email subject
      react: SendOtp({
        projectName: "The Dream Project",
        recipientName: user.fullname,
        action: "Sign in",
        otp: generateOTP(), // Generate OTP directly here
        supportEmail: "support@support.com",
        baseUrl: evar.domain,
      }), // React component generating the email content
    });

    // Check if there was an error sending the email
    if (error) {
      return NextResponse.json(
        {
          message: "An error occurred while sending otp. Please try again.",
          user: null,
          error, // Return the error object for debugging
        },
        { status: 500 }
      ); // Set HTTP status code 500 for internal server error
    }

    return NextResponse.json(
      {
        message: "User verified",
        user,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = serverError(error);
    return NextResponse.json(
      {
        message: `${errorMessage}. Please try again or contact support.`,
        user: null,
        error,
      },
      { status: 500 }
    ); // Set HTTP status code 500 for internal server error
  }
}
