import { NextResponse } from "next/server";
import { authenticator } from "otplib"; // Library for OTP generation and verification
import { evar } from "@/lib/envConstant"; // Environment variable containing the OTP secret key
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../AuthOptions";
import { User } from "@/lib/mongodb/models/user.model";
import connectToDb from "@/lib/mongodb/connection/db";

// Function to verify if the provided OTP is correct
const verifyOTP = (otp: string) => {
  return authenticator.verify({ token: otp, secret: evar.otpSec });
};

export async function POST(req: Request) {
  connectToDb();
  // Configure OTP settings
  authenticator.options = { window: 5 }; // Allows for a small time window for OTP validity
  authenticator.options = { digits: 6 }; // Specifies the length of the OTP

  // Extract the OTP from the incoming request
  const { otp } = await req.json();

  const {
    user: { sub },
  } = await getServerSession(authOptions);

  try {
    // Verify the provided OTP using the custom verification function
    const isOtpValid = verifyOTP(otp);

    const user = await User.findOneAndUpdate(
      { userId: sub },
      { isEmailVerified: true }
    );

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found. Please sign in or sign up.",
          isOtpValid, // True if the OTP verification was successful
          user: null,
          error: null,
        },
        { status: 500 } // HTTP 200 OK for successful operation
      );
    }

    if (isOtpValid) {
      // If the OTP is valid, return a successful response
      return NextResponse.json(
        {
          message: "OTP verified!",
          isOtpValid, // True if the OTP verification was successful
          user,
          error: null,
        },
        { status: 200 } // HTTP 200 OK for successful operation
      );
    }

    // If the OTP is invalid, return a response indicating client-side error
    return NextResponse.json(
      {
        message: "Invalid OTP!",
        isOtpValid,
        user: null,
        error: null,
      },
      { status: 400 } // HTTP 400 Bad Request for invalid input
    );
  } catch (error) {
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

    // Log the error for debugging and tracing issues
    console.error("Error in verifying OTP:", error);

    // Return a generic error message in case of server-side issues
    return NextResponse.json(
      {
        message: `${errorMessage}. Please try again!`, // Informative message for users
        isOtpValid: false,
        user: null,
        error, // Return the caught error for additional context
      },
      { status: 500 } // HTTP 500 Internal Server Error for unexpected issues
    );
  }
}
