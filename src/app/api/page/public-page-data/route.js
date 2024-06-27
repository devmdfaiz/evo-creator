import { NextResponse } from "next/server";
import connectToDb from "@/lib/mongodb/connection/db";
import { Page } from "@/lib/mongodb/models/page.model";

export async function POST(req) {
  connectToDb();

  const { id } = await req.json();

  console.log("id", id)

  try {
    const fieldValue = await Page.findOne({_id: id});

    console.log("fieldValue", fieldValue)

    return NextResponse.json(
      {
        massage: `This is the page data of ${id}`,
        fieldValue,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("There is problem in creating page =>", error);
    return NextResponse.json({ massage: error }, { status: 500 });
  }
}
