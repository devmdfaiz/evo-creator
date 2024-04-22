import connectToDb from "@/lib/mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  connectToDb();

  const { phone, password } = await req.json();

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return NextResponse.json({
        massage: "User dose not exist. Please first create an account",
        status: false,
        redirectTo: "/sign-up",
        error: null,
        user: null,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({
        massage: "Please enter correct password",
        status: false,
        user: null,
        error: null,
        redirectTo: null,
      });
    }

    return NextResponse.json({
      massage: "User verified",
      status: true,
      user,
      error: null,
      redirectTo: null,
    });
  } catch (error) {
    console.log("There is problem in login =>", error);
    return NextResponse.json({
      massage: "Something went wrong. Please try again",
      status: false,
      user: null,
      redirectTo: null,
      error,
    });
  }
}
