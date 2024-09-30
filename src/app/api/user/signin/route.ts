import connectToDb from "@/lib/mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { evar } from "@/lib/envConstant";
import SendOtp from "../../../../../emails/otp.email";
import { generateOTP } from "@/lib/otplib/otplib";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { transporter } from "@/lib/nodemailer/nodemailer";
import { render } from "@react-email/components";
import { resend } from "@/lib/resend/resend";

export async function POST(req: Request, res: Response) {
  try {
    connectToDb();

    const { phone, password } = await req.json();

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

    // Send the OTP to a specific email address using the "nodemailer" service

    // handle by resend
    const { data, error } = await resend.emails.send({
      from: "Verification OTP <otp@evocreator.com>",
      to: user.email,
      subject: `Your One-Time Password (OTP) from ${evar.projectName}`,
      react: SendOtp({
        projectName: evar.projectName,
        recipientName: user.fullname,
        action: "Sign in",
        otp: generateOTP(),
        supportEmail: "support@evocreator.com",
        baseUrl: evar.domain,
      }),
    });

    if (error) {
      return NextResponse.json(
        {
          message: "An error in sending email. Please try again.",
          error,
          user: null,
        },
        { status: 500 } // HTTP 500 Internal Server Error for unexpected issues
      );
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
