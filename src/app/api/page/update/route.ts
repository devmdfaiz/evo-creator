import connectToDb from "@/lib/mongodb/connection/db";
import { Page } from "@/lib/mongodb/models/page.model";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../AuthOptions";
import { User } from "@/lib/mongodb/models/user.model";

export async function POST(req: Request) {
  try {
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
          error:
            "Your account has been blocked. For more information, please contact us.",
        },
        { status: 403 }
      );
    }

    const { fieldsInput, pageId } = await req.json();

    if (!fieldsInput || !pageId) {
      console.warn("Missing fieldsInput or pageId in the request body");
      return NextResponse.json(
        {
          message: "Invalid request: missing fieldsInput or pageId",
          error: null,
        },
        { status: 400 }
      );
    }

    const pageDetail = await Page.findOneAndUpdate(
      { pageId },
      { ...fieldsInput },
      { new: true }
    );

    if (!pageDetail) {
      console.warn(`Page with ID: ${pageId} not found`);
      return NextResponse.json(
        {
          message: "Page not found",
          error: null,
        },
        { status: 404 }
      );
    }

    console.log(`Page with ID: ${pageId} updated successfully`);
    return NextResponse.json(
      {
        message: "Page details updated successfully",
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating page details:", error);
    const errorMessage = serverError(error);

    return NextResponse.json(
      {
        message: `Failed to update page details: ${errorMessage}`,
        error,
      },
      { status: 500 }
    );
  }
}
