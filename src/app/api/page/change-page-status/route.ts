import connectToDb from "@/lib/mongodb/connection/db";
import { Page } from "@/lib/mongodb/models/page.model";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDb();

    const { pageId, action } = await req.json();

    if (!pageId) {
      return NextResponse.json(
        {
          page: null,
          message: "Page ID is required.",
          error: "Page ID is missing in the request.",
        },
        { status: 400 }
      );
    }

    const updatedPageData = await Page.findOneAndUpdate(
      { pageId },
      { publishStatus: action },
      { new: true }
    );

    if (!updatedPageData) {
      return NextResponse.json(
        {
          page: null,
          message: "Page not found or update failed.",
          error: "The page with the specified ID could not be found or updated.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        page: updatedPageData,
        message: "Page has been set to private successfully.",
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("There is a problem in making the page private:", error);

    const errorMessage = serverError(error);

    return NextResponse.json(
      {
        page: null,
        message: "Failed to set the page to private.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
