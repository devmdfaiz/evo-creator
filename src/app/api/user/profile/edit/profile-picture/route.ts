import connectToDb from "@/lib/mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { authOptions } from "../../../../../../../AuthOptions";
import { evar } from "@/lib/envConstant";
import { storageClient } from "@/lib/utils/appwrite/appwriteClient";

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
    const avatar = await req.json();

    if (
      !avatar ||
      typeof avatar !== "object" ||
      !avatar.avatarId ||
      !avatar.avatarUrl
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid avatar data. Please provide valid avatar information.",
          user: null,
          error: "Invalid avatar data",
        },
        { status: 400 }
      );
    }

    // Find the user in the database
    const userToCheck = await User.findOne({ userId: sub });

    if (!userToCheck) {
      return NextResponse.json(
        {
          message: "User not found.",
          user: null,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // Delete old avatar if it's not the default one
    if (userToCheck.avatar.avatarId !== "default") {
      await storageClient.deleteFile(
        evar.appwriteBucketId,
        userToCheck.avatar.avatarId
      );
    }

    // Update user information in the database
    const user = await User.findOneAndUpdate(
      { userId: sub },
      { avatar, emailVerificationStatus },
      { new: true } // Return the updated document
    );

    return NextResponse.json(
      {
        message: "Profile updated successfully.",
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
