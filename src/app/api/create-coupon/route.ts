import connectToDb from "@/lib/mongodb/connection/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../AuthOptions";
import { NextResponse } from "next/server";
import { Coupon } from "@/lib/mongodb/models/coupon.model";
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
          error: "User session not found",
          isCouponCreated: false,
        },
        { status: 401 }
      );
    }

    const { code, discount, expiry, pageId } = await req.json();

    // Validate input
    if (!code || !discount || !expiry || !pageId) {
      return NextResponse.json(
        {
          message: "Missing required fields",
          error: "Invalid input data",
          isCouponCreated: false,
        },
        { status: 400 }
      );
    }

    // Create coupon
    const coupon = await Coupon.create({
      code,
      discount,
      expiry,
      ofPage: pageId,
      creator: session.user.sub,
    });

    return NextResponse.json(
      {
        message: "Coupon successfully created! Your new discount is now available for use.",
        error: null,
        coupon,
        isCouponCreated: true,
      },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    console.error("Coupon creation error:", error);

    const errorMessage = serverError(error);
    return NextResponse.json(
      {
        message: "An error occurred while creating the coupon.",
        error: errorMessage,
        coupon: null,
        isCouponCreated: false,
      },
      { status: 500 }
    );
  }
}
