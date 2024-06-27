import connectToDb from "@/lib/mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import { serverError } from "@/lib/utils/error/errorExtractor";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDb();

  try {
    const { password, user } = await req.json();

    // Hash the password for security
    const hashPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    const userEdited = await User.findOneAndUpdate(
      { email: user.email },
      { password: hashPassword }
    );

    if (!userEdited) {
      return NextResponse.json(
        {
          message: "User not found",
          changed: false,
          error: null,
        },
        { status: 404 } // 404 Not Found: The user with the given email was not found.
      );
    }

    return NextResponse.json(
      {
        message: "Password has been changed.",
        changed: true,
        error: null,
      },
      { status: 200 } // 200 OK: The request has succeeded, and the password has been changed.
    );
  } catch (error) {
    const errorMessage = serverError(error);

    return NextResponse.json(
      {
        message: `${errorMessage}. Please try again or contact support.`,
        changed: false,
        error,
      },
      { status: 500 } // 500 Internal Server Error: An error occurred on the server.
    );
  }
}
