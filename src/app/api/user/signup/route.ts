import connectToDb from "@/lib/mongodb/connection/db";
import { User } from "@/lib/mongodb/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  connectToDb();

  const { fullname, email, password, phone } = await req.json();

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const isUserExist = await User.findOne({ phone });

    if (email === isUserExist?.email) {
      return NextResponse.json({
        massage:
          "Provided email is already exist. Please use other email or try to sign in",
        status: false,
        user: isUserExist,
        error: null,
      });
    }

    if (email === isUserExist?.email) {
      return NextResponse.json({
        massage:
          "Provided phone number is already exist. Please use other phone number or try to sign in",
        status: false,
        user: isUserExist,
        error: null,
      });
    }
  } catch (error) {
    console.log("There is problem in creating user in db =>", error);
    return NextResponse.json({
      massage: "Something went wrong. Please try again",
      status: false,
      user: null,
      error,
    });
  }

  try {
    const user = await User.create({
      fullname,
      phone,
      email,
      password: hashPassword,
    });

    return NextResponse.json({
      massage: "User created successfully",
      status: true,
      user,
      error: null,
    });
  } catch (error) {
    console.log("There is problem in creating user in db =>", error);
    return NextResponse.json({
      massage: "Something went wrong. Please try again",
      status: false,
      user: null,
      error,
    });
  }
}
