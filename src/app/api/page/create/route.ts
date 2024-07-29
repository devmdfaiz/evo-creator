import connectToDb from "@/lib/mongodb/connection/db";
import { Page } from "@/lib/mongodb/models/page.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import uniqid from "uniqid";
import { authOptions } from "../../../../../AuthOptions";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { User } from "@/lib/mongodb/models/user.model";

export async function POST(req: Request) {
  try {
    // Establish a database connection
    await connectToDb();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "User is not authenticated. Please log in.", order: null },
        { status: 401 }
      );
    }

    const { sub } = session.user;

    const userData = await User.findOne({ userId: sub });

    if (userData?.accountStatus === "BLOCKED") {
      return NextResponse.json(
        {
          message: "Account Blocked",
          error: "Your account has been blocked. For more information, please contact us.",
        },
        { status: 403 }
      );
    }

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
        },
        { new: true }
      );

      if (!pageEditedSeoResponse) {
        return NextResponse.json(
          {
            message: `No page found with ID: ${pageIdForUpdate}`,
            error: "Page not found",
            pageEditedSeoResponse: null,
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          message: "Page SEO updated successfully.",
          error: null,
          pageEditedSeoResponse,
        },
        { status: 200 }
      );
    }

    // Generate a unique page ID
    const pageId = uniqid("page-");

    // Create a new page document in the database
    const newPage = await Page.create({
      metaData: { metaTitle, metaDesc, keywords, seoHashUrl: fullHash },
      creator: sub,
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
