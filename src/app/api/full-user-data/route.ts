import connectToDb from "@/lib/mongodb/connection/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../AuthOptions";
import { NextResponse } from "next/server";
import { User } from "@/lib/mongodb/models/user.model";
import { serverError } from "@/lib/utils/error/errorExtractor";

export async function POST(req: Request) {
  try {
    // Establish a database connection
    await connectToDb();

    // Retrieve the user session
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user) {
    //   return NextResponse.json(
    //     {
    //       message: "User is not authenticated. Please log in.",
    //       user: null,
    //       error: "Authentication required",
    //     },
    //     { status: 401 }
    //   );
    // }

    // Extract user ID from the session
    const { userId } = await req.json();

    // Retrieve user data from the database
    const userData = await User.findOne({ userId });

    if (!userData) {
      return NextResponse.json(
        {
          message: "User not found.",
          user: null,
          error: "User data not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User found successfully.",
        user: userData,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in finding user data:", error);
    const errorMessage = serverError(error);

    return NextResponse.json(
      {
        message: errorMessage,
        user: null,
        error,
      },
      { status: 500 }
    );
  }
}
