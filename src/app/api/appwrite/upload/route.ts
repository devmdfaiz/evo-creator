import { evar } from "@/lib/envConstant";
import { storageClient } from "@/lib/utils/appwrite/appwriteClient";
import { serverError } from "@/lib/utils/error/errorExtractor";
import { ID } from "appwrite";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    // Check if the file exists in the request
    if (!file) {
      return NextResponse.json(
        {
          isFileUploaded: false,
          message: "File not found in the request.",
          error: "File does not exist!",
          fileResponse: null,
        },
        { status: 400 } // 400 Bad Request: The request does not have the required file
      );
    }

    // Try to create the file in the storage
    const fileResponse = await storageClient.createFile(
      evar.appwriteBucketId,
      ID.unique(),
      file
    );

    return NextResponse.json(
      {
        isFileUploaded: true,
        message: "File uploaded successfully.",
        error: null,
        fileResponse,
      },
      { status: 201 } // 201 Created: The file has been successfully uploaded and created
    );
  } catch (error) {
    console.error("Error during uploading to appwrite: ", error);
    const errorMessage = serverError(error);

    return NextResponse.json(
      {
        isFileUploaded: false,
        message: "An error occurred during file upload. Please try again or contact support.",
        error: errorMessage,
        fileResponse: null,
      },
      { status: 500 } // 500 Internal Server Error: An error occurred on the server during file upload
    );
  }
}
