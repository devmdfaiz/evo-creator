import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../AuthOptions";
import { User } from "@/lib/mongodb/models/user.model";
import connectToDb from "@/lib/mongodb/connection/db";
import { verifyOTP } from "@/lib/otplib/otplib";
import { serverError } from "@/lib/utils/error/errorExtractor";

export async function POST(req: Request) {
  try {
    connectToDb();

    // Extract the OTP from the incoming request
    const { otp } = await req.json();

    const {
      user: { sub },
    } = await getServerSession(authOptions);

    // Verify the provided OTP using the custom verification function
    const isOtpValid = verifyOTP(otp);

    const user = await User.aggregate([
      {
        $match: { userId: sub }, // Replace "YOUR_USER_ID" with the actual userId value
      },
      {
        $set: { emailVerificationStatus: "verified" },
      },
    ]);

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
          user: user[0],
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
    const errorMessage = serverError(error);

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
