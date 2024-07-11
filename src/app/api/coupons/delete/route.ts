import connectToDb from "@/lib/mongodb/connection/db";
import { Coupon } from "@/lib/mongodb/models/coupon.model";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectToDb();

    // Parse and validate request body
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        {
          message: "Coupon ID is required.",
          error: "Coupon ID missing in request body.",
        },
        { status: 400 }
      );
    }

    // Find and delete the coupon
    const coupon = await Coupon.findOneAndDelete({ _id: id });
    if (!coupon) {
      return NextResponse.json(
        {
          message: "Coupon not found.",
          error: "No coupon exists with the provided ID.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Coupon deleted successfully.",
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = serverError(error);
    console.error("Error deleting coupon:", error);

    return NextResponse.json(
      {
        message: `${errorMessage}. Please try again or contact support.`,
        error,
      },
      { status: 500 }
    );
  }
}
