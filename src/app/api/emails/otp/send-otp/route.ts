import SendOtp from "../../../../../../emails/otp.email"; // React component to generate OTP email content
import { NextResponse } from "next/server"; // Response object for Next.js Serverless functions
import { evar } from "@/lib/envConstant"; // Environment variables for sensitive data
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../AuthOptions";
import { generateOTP } from "@/lib/otplib/otplib";
import { render } from "@react-email/components";
import { transporter } from "@/lib/nodemailer/nodemailer";

export async function GET(req: Request) {
  try {
    // Generate a new OTP
    const otp = generateOTP();

    const {
      user: { name, email },
    } = await getServerSession(authOptions);

    if (!otp) {
      // If OTP generation fails, return an appropriate response
      return NextResponse.json(
        {
          message: "Failed to generate OTP.",
          error: null,
        },
        { status: 500 } // HTTP 500 Internal Server Error
      );
    }

    // Send the OTP to a specific email address using the "nodemailer" service

    const emailHtml = render(
      SendOtp({
        projectName: evar.projectName,
        recipientName: name,
        action: "Sign in/up",
        otp: generateOTP(),
        supportEmail: "support@support.com",
        baseUrl: evar.domain,
      })
    );

    const info = await transporter.sendMail({
      from: evar.senderEmail, // sender address
      to: email, // list of receivers
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

    // If successful, return a response indicating email was sent successfully
    return NextResponse.json(
      {
        message: "Email sent successfully.",
        error: null,
      },
      { status: 200 } // HTTP 200 OK for successful operation
    );
  } catch (error: unknown) {
    let errorMessage =
      "An error occurred while creating your account. Please try again or contact support.";

    if (error instanceof Error) {
      // If it's a standard Error object, get the message
      errorMessage = error.message;
    } else if (typeof error === "string") {
      // If it's a string, use it directly
      errorMessage = error;
    } else if (error && typeof error === "object" && "message" in error) {
      // If it's an object with a message property, use it
      errorMessage = (error as { message: string }).message;
    }

    console.error("Error during OTP generation or email sending:", error); // Log the error for debugging

    return NextResponse.json(
      {
        message: `${errorMessage}. Please try again!`, // User-friendly error message,
        error, // Return the error object for debugging
      },
      { status: 500 } // HTTP 500 Internal Server Error for unexpected issues
    );
  }
}
