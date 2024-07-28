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

    const emailHtml = render(
      PasswordResetLinkEmail({
        projectName: evar.projectName,
        recipientName: user.fullname,
        action: "reset password",
        link: `${evar.domain}/reset-password/${token}`,
        supportEmail: "support@support.com",
        baseUrl: evar.domain,
      })
    );

    const info = await transporter.sendMail({
      from: evar.senderEmail, // sender address
      to: user.email, // list of receivers
      subject: `Your One-Time Password (OTP) from ${evar.projectName}`, // Subject line
      html: emailHtml, // html body
    });

    // Check if there was an error sending the email
    if (!info.messageId) {
      return NextResponse.json(
        {
          message: "An error in sending email. Please try again.",
          error: "Email sending failed",
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
