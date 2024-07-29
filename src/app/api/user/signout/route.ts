import connectToDb from "@/lib/mongodb/connection/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../AuthOptions";
import { NextResponse } from "next/server";
import { User } from "@/lib/mongodb/models/user.model";
import { serverError } from "@/lib/utils/error/errorExtractor";

export async function GET(req: Request) {
  try {
    // Establish a database connection
    await connectToDb();

    // Get the user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "User is not authenticated. Please log in." },
        { status: 401 }
      );
    }

    const { sub } = session.user;

    // Update the user's email verification status
    const userData = await User.findOneAndUpdate(
      { userId: sub },
      { emailVerificationStatus: "unverified" },
      { new: true } // Return the updated document
    );

    if (!userData) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Email verification status updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating email verification status:", error);
    const errorMessage = serverError(error);

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
