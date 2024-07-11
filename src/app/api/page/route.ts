import connectToDb from "@/lib/mongodb/connection/db";
import { Page } from "@/lib/mongodb/models/page.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../AuthOptions";
import { serverError } from "@/lib/utils/error/errorExtractor";

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
          pageOrders: { $exists: true, $ne: [] },
          creator: session.user.sub,
          createdAt: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate),
          },
        },
      },
      { $unwind: "$pageOrders" },
      {
        $lookup: {
          from: "orders",
          localField: "pageOrders",
          foreignField: "_id",
          as: "order",
        },
      },
      { $unwind: "$order" },
      {
        $match: {
          "order.isPaid": true,
        },
      },
      {
        $group: {
          _id: "$_id",
          totalRevenue: { $sum: "$order.amount" },
          paidOrdersCount: { $sum: 1 },
          metaTitle: { $first: "$metaData.metaTitle" },
          coverImg: { $first: "$pageContent.coverImg" },
          pageId: { $first: "$pageId" },
          pagePrice: { $first: "$pagePrice" },
          pageView: { $first: "$pageView" },
          isPublished: { $first: "$isPublished" },
          createdAt: { $first: "$createdAt" },
        },
      },
    ]);

    // Return a successful response with the aggregated pages data
    return NextResponse.json(
      {
        message: "Pages data retrieved successfully.",
        error: null,
        pages,
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
