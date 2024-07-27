import connectToDb from "@/lib/mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDb();

    const { userId, roll } = await req.json();

    if (!userId) {
      return NextResponse.json(
        {
          user: null,
          message: "User ID is required.",
          error: "User ID is missing in the request.",
        },
        { status: 400 }
      );
    }

    const updatedUserData = await User.findOneAndUpdate(
      { userId },
      { userRole: roll },
      { new: true }
    );

    if (!updatedUserData) {
      return NextResponse.json(
        {
          user: null,
          message: "User not found or update failed.",
          error:
            "The user with the specified ID could not be found or updated.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        user: updatedUserData,
        message: "User has been set to private successfully.",
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("There is a problem in changing permission:", error);

    const errorMessage = serverError(error);

    return NextResponse.json(
      {
        user: null,
        message: "Failed to change user permission.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
