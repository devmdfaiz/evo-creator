import connectToDb from "@/lib/mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import { NextResponse } from "next/server";
import { evar } from "@/lib/envConstant";
import PasswordResetLinkEmail from "../../../../../../emails/resetPassword.email";
import jwt from "jsonwebtoken";
import { addMinutes } from "date-fns";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { render } from "@react-email/components";
import { transporter } from "@/lib/nodemailer/nodemailer";
import { resend } from "@/lib/resend/resend";

export async function POST(req: Request, res: Response) {
  connectToDb();

  const { phone } = await req.json();

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

    const token = jwt.sign(
      {
        name: user.fullname,
        phone: user.phone,
        email: user.email,
        expiry: addMinutes(new Date(), 5),
      },
      evar.jwtSec
    );

    // Send the OTP to a specific email address using the "resend" service

    // handle by resend
    const { data, error } = await resend.emails.send({
      from: "Password reset link <forget-password@evocreator.com>",
      to: user.email,
      subject: `Your Password reset link from ${evar.projectName}`,
      react: PasswordResetLinkEmail({
        projectName: evar.projectName,
        recipientName: user.fullname,
        action: "reset password",
        link: `${evar.domain}/reset-password/${token}`,
        supportEmail: "support@support.com",
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
        message: "Forgot password link has sended to your email",
        user: user.email,
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
