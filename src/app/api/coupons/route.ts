import connectToDb from "@/lib/mongodb/connection/db";
import { Coupon } from "@/lib/mongodb/models/coupon.model";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../AuthOptions";

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectToDb();

        // Parse and validate request body
        const { pageId } = await req.json();
        if (!pageId) {
          return NextResponse.json(
            {
              message: "Page ID is required.",
              error: "Page ID missing in request body.",
            },
            { status: 400 }
          );
        }

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

    // Fetch coupons for the user
    const coupons = await Coupon.find({ creator: session.user.sub, ofPage: pageId });

    // Check if coupons were found
    if (!coupons || coupons.length === 0) {
      return NextResponse.json(
        {
          message: "No coupons found for this page.",
          coupons: null,
          error: "No coupons available.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully retrieved this page coupons.",
        coupons,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving page coupons:", error);
    const errorMessage = serverError(error);

    return NextResponse.json(
      {
        message: `${errorMessage}. Please try again or contact support.`,
        coupons: null,
        error,
      },
      { status: 500 }
    );
  }
}
