import connectToDb from "@/lib/mongodb/connection/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../AuthOptions";
import { NextResponse } from "next/server";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { User } from "@/lib/mongodb/models/user.model";

/**
 * Handles the POST request to fetch orders within a specified date range and comparison period.
 * 
 * @param {Request} req - The incoming HTTP request object.
 * @returns {Promise<Response>} - The HTTP response containing the order data or an error message.
 */
export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectToDb();

    // Get user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({
        message: "User is not authenticated. Please log in.",
        error: "User session not found",
        orders: null,
      }, { status: 401 });
    }

    // Parse the request body
    const { fromDate, toDate, dayGap } = await req.json();
    if (!fromDate || !toDate || dayGap === undefined) {
      return NextResponse.json({
        message: "Invalid input. Please provide 'fromDate', 'toDate', and 'dayGap'.",
        error: "Missing required fields",
        orders: null,
      }, { status: 400 });
    }

    // Calculate the comparison period start date
    const comparisonStartDate = new Date(toDate);
    comparisonStartDate.setDate(
      comparisonStartDate.getDate() - (Number.isNaN(dayGap) ? 0 : dayGap)
    );

    // Aggregate orders for the current period and the comparison period
    const orders = await User.aggregate([
      {
        $facet: {
          currentPeriod: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(fromDate),
                  $lte: new Date(toDate),
                },
              },
            },
          ],
          comparisonPeriod: [
            {
              $match: {
                createdAt: {
                  $gte: comparisonStartDate,
                  $lte: new Date(toDate),
                },
              },
            },
          ],
        },
      },
    ]);

    // Return a successful response with the aggregated orders data
    return NextResponse.json(
      {
        message: "Users fetched successfully.",
        orders,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = serverError(error);
    console.error("Error fetching users:", error);

    // Return an error response
    return NextResponse.json({
      message: "Failed to fetch users. Please try again later.",
      orders: null,
      error: errorMessage,
    }, { status: 500 });
  }
}
