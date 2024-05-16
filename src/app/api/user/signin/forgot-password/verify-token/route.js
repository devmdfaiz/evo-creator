import { evar } from "@/lib/envConstant";
import connectToDb from "@/lib/mongodb/connection/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDb();

  try {
    // Parse token from request body
    const { token } = await req.json();

    // Verify the JWT token
    const decodedToken = jwt.verify(token, evar.jwtSec);

    // Check if token verification failed
    if (!decodedToken) {
      return NextResponse.json(
        {
          message: "Invalid link!",
          error: null,
          user: null,
        },
        { status: 400 } // 400 Bad Request: The server cannot process the request due to client error.
      );
    }

    // Check if the token is expired
    if (new Date(decodedToken.expiry) < new Date()) {
      return NextResponse.json(
        {
          message: "Link is expired",
          error: null,
          user: null,
        },
        { status: 410 } // 410 Gone: The resource requested is no longer available and will not be available again.
      );
    }

    // Token is valid and not expired
    return NextResponse.json(
      {
        message: "Link is valid",
        error: null,
        user: decodedToken,
      },
      { status: 200 } // 200 OK: The request has succeeded.
    );
  } catch (error) {
    console.log("JWT error is:", error);

    return NextResponse.json(
      {
        message: "There is an error",
        error: error.message,
        user: null,
      },
      { status: 500 } // 500 Internal Server Error: The server encountered an unexpected condition.
    );
  }
}
