import connectToDb from "@/lib/mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../AuthOptions";
import { NextResponse } from "next/server";
import { serverError } from "@/lib/utils/error/errorExtractor";

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectToDb();

    // Get user session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "User is not authenticated. Please log in.",
          user: null,
          error: "User session not found",
        },
        { status: 401 }
      );
    }

    // Extract user ID from session
    const { sub, emailVerificationStatus } = session.user;

    // Parse and validate request body
    const { fullname, email, phone } = await req.json();

    if (!fullname || !email || !phone) {
      return NextResponse.json(
        {
          message: "Missing required fields: Full Name, Email, and Phone.",
          user: null,
          error: "Invalid request body",
        },
        { status: 400 }
      );
    }

    // Update user information in the database
    const user = await User.findOneAndUpdate(
      { userId: sub },
      { fullname, phone, email, emailVerificationStatus },
      { new: true } // Return the updated document
    );

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
          user: null,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User information updated successfully.",
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
    );
  }
}
