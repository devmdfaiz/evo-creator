import { resend } from "@/lib/resend/resend"; // Library for sending emails
import SendOtp from "../../../../../../emails/otp.email"; // React component to generate OTP email content
import { NextResponse } from "next/server"; // Response object for Next.js Serverless functions
import { authenticator } from "otplib"; // Library for OTP generation and verification
import { evar } from "@/lib/envConstant"; // Environment variables for sensitive data
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../AuthOptions";

// Function to generate a new OTP
const generateOTP = () => {
  // Generate a 6-digit OTP using a secret key from environment variables
  const otp = authenticator.generate(evar.otpSec);
  return otp;
};

export async function GET(req: Request) {
  // Configure OTP settings
  authenticator.options = { window: 5 }; // Time window for OTP validation (in minutes)
  authenticator.options = { digits: 6 }; // Length of the OTP

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

    // Send the OTP to a specific email address using the "resend" service
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Sender's email address
      to: email, // Recipient's email address
      subject: "Your One-Time Password (OTP) from The Dream Project", // Email subject
      react: SendOtp({
        projectName: "The Dream Project",
        recipientName: name,
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
