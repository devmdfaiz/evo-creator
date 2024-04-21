import connectToDb from "@/lib/mongodb/connection/db";
import { Page } from "@/lib/mongodb/models/page.model";
import { NextResponse } from "next/server";

type Params = {
  id: string
}

export async function GET(req: Request, context: { params: Params }) {
  connectToDb();

  const id =
    context.params.id

    try {
      const fieldValue = await Page.findById(id);

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
