import { NextResponse } from "next/server";
import connectToDb from "@/lib/mongodb/connection/db";
import { Page } from "@/lib/mongodb/models/page.model";
import { serverError } from "@/lib/utils/error/errorExtractor";

export async function POST(req: Request) {
  try {
    await connectToDb();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          message: "Page ID is required.",
          fieldValue: null,
        },
        { status: 400 }
      );
    }

    const fieldValue = await Page.findOne({ pageId: id });

    if (!fieldValue) {
      return NextResponse.json(
        {
          message: `No page found with ID: ${id}`,
          error: `Field value not found for ID: ${id}`,
          fieldValue: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: `Page data retrieved successfully for ID: ${id}`,
        error: null,
        fieldValue,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = serverError(error);
    console.error("Error fetching page data:", error);
    return NextResponse.json(
      {
        message: errorMessage,
        error,
        fieldValue: null,
      },
      { status: 500 }
    );
  }
}
