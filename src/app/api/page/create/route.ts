import connectToDb from "@/lib/mongodb/connection/db";
import { Page } from "@/lib/mongodb/models/page.model";
import { NextResponse } from "next/server";
import uniqid from "uniqid";

export async function POST(req: Request, res: Response) {
  connectToDb();

  const { metaTitle, metaDesc, keywords, pageType, subdomain, user } =
    await req.json();

  const { sub } = user;

  const pageId = uniqid("page-")

  try {
    const res = await Page.create({
      metaData: { metaTitle, metaDesc, keywords },
      subdomain,
      creator: sub,
      pageId,
    });

    const pageData = { id: res._id, pageType: res.pageType };

    return NextResponse.json({
      massage: "Page created",
      status: true,
      error: null,
      pageData,
    });
  } catch (error) {
    console.log("There is problem in creating page =>", error);
    return NextResponse.json({
      massage: "There is problem in creating page. Please try again",
      status: false,
      error,
      pageData: null,
    });
  }
}
