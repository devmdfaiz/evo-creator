import connectToDb from "@/lib/mongodb/connection/db";
import { Page } from "@/lib/mongodb/models/page.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import uniqid from "uniqid";
import { authOptions } from "../../../../../AuthOptions";
import { serverError } from "@/lib/utils/error/errorExtractor";

export async function POST(req: Request) {
  try {
    // Establish a database connection
    await connectToDb();

    // Parse the request body
    const {
      metaTitle,
      metaDesc,
      keywords,
      fullHash,
      actionType,
      pageId: pageIdForUpdate,
    } = await req.json();

    if (actionType === "update") {
      const pageEditedSeoResponse = await Page.findOneAndUpdate(
        { pageId: pageIdForUpdate },
        {
          metaData: { metaTitle, metaDesc, keywords, seoHashUrl: fullHash },
        }
      );

      return NextResponse.json(
        {
          message: "Page SEO updated successfully.",
          error: null,
          pageEditedSeoResponse,
        },
        { status: 200 }
      );
    }

    // Get the user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "User is not authenticated. Please log in.",
          error: "User session not found",
          pageData: null,
        },
        { status: 401 }
      );
    }

    // Generate a unique page ID
    const pageId = uniqid("page-");

    // Create a new page document in the database
    const newPage = await Page.create({
      metaData: { metaTitle, metaDesc, keywords, seoHashUrl: fullHash },
      creator: session.user.sub,
      pageId,
    });

    // Prepare the response data
    const pageData = { id: newPage.pageId };

    // Return a success response
    return NextResponse.json(
      {
        message: "Page created successfully.",
        error: null,
        pageData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating page:", error);
    const errorMessage = serverError(error);

    // Return an error response
    return NextResponse.json(
      {
        message: "An error occurred while creating the page.",
        error: errorMessage,
        pageData: null,
      },
      { status: 500 }
    );
  }
}
