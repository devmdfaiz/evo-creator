import connectToDb from "@/lib/mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import uniqid from "uniqid";

export async function POST(req: Request) {
  // Connect to the database
  await connectToDb();

  const { fullname, email, password, phone } = await req.json();

  // Hash the password for security
  const hashPassword = await bcrypt.hash(password, 10);

  // Generate a unique user ID
  const userId = uniqid("user-");

  try {
    // Check if a user with the same email already exists
    const existingUserWithEmail = await User.findOne({ email });

    // Check if a user with the same phone already exists
    const existingUserWithPhone = await User.findOne({ phone });

    if (existingUserWithPhone && existingUserWithEmail) {
      return NextResponse.json(
        {
          message:
            "This email and phone are already registered. Try signing in or use different details.",
          user: null,
          error: null,
        },
        { status: 409 } // 409 Conflict
      );
    }

    if (existingUserWithEmail) {
      return NextResponse.json(
        {
          message: "Email already in use. Please sign in or use another email.",
          user: null,
          error: null,
        },
        { status: 409 } // 409 Conflict
      );
    }

    if (existingUserWithPhone) {
      return NextResponse.json(
        {
          message:
            "Phone number already in use. Please sign in or use another email.",
          user: null,
          error: null,
        },
        { status: 409 } // 409 Conflict
      );
    }

    // Create a new user
    const newUser = await User.create({
      fullname,
      phone,
      email,
      password: hashPassword,
      userId,
    });

    return NextResponse.json(
      {
        message: "Account created successfully!",
        user: newUser,
        error: null,
      },
      { status: 201 } // 201 Created
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

    console.error("Error creating user:", error);

    return NextResponse.json(
      {
        message: `${errorMessage}. Please try again!`,
        user: null,
        error: error,
      },
      { status: 500 }
    );
  }
}
