import connectToDb from "@/lib/mongodb/connection/db";
import { Page } from "@/lib/mongodb/models/page.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../AuthOptions";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { User } from "@/lib/mongodb/models/user.model";

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectToDb();

    // Get the user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "User is not authenticated. Please log in.",
          error: "User session not found",
          pages: null,
        },
        { status: 401 }
      );
    }

    // Parse the request body
    const { fromDate, toDate } = await req.json();
    if (!fromDate || !toDate) {
      return NextResponse.json(
        {
          message:
            "Invalid input. Please provide both 'fromDate' and 'toDate'.",
          error: "Missing required fields",
          pages: null,
        },
        { status: 400 }
      );
    }

    // Aggregate pages data based on the provided date range and user ID
    const pages = await Page.aggregate([
      {
        $match: {
          creator: session.user.sub,
          createdAt: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate),
          },
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "pageOrders",
          foreignField: "orderId",
          as: "orders",
        },
      },
      {
        $unwind: {
          path: "$orders",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [{ "orders.isPaid": true }, { orders: { $exists: false } }],
        },
      },
      {
        $group: {
          _id: "$_id",
          totalRevenue: {
            $sum: {
              $cond: [
                { $ifNull: ["$orders.isPaid", false] },
                "$orders.amountToPay",
                0,
              ],
            },
          },
          paidOrdersCount: {
            $sum: { $cond: [{ $ifNull: ["$orders.isPaid", false] }, 1, 0] },
          },
          metaTitle: { $first: "$metaData.metaTitle" },
          seoHashUrl: { $first: "$metaData.seoHashUrl" },
          pageHashUrl: { $first: "$pageHashUrl" },
          files: { $first: "$files" },
          pageId: { $first: "$pageId" },
          pagePrice: { $first: "$pagePrice" },
          pageView: { $first: "$pageView" },
          publishStatus: { $first: "$publishStatus" },
          createdAt: { $first: "$createdAt" },
        },
      },
    ]);

    const userData = await User.findOne({ userId: session.user.sub });

    const accountStatus = userData!.accountStatus;

    // Return a successful response with the aggregated pages data
    return NextResponse.json(
      {
        message: "Pages data retrieved successfully.",
        error: null,
        pages,
        accountStatus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving pages data:", error);
    const errorMessage = serverError(error);

    // Return an error response
    return NextResponse.json(
      {
        message: "Failed to retrieve pages data. Please try again later.",
        error: errorMessage,
        pages: null,
      },
      { status: 500 }
    );
  }
}
