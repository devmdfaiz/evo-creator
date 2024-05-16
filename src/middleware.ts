import { withAuth } from "next-auth/middleware";
import { publicApiRoute } from "../routes";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const token = !!req.nextauth.token; //?? finding token
    const tokenWithUserData = req.nextauth.token; //?? finding token
    const pathname = req.nextUrl.pathname; //?? finding pathname

    let hostname = req.headers; //?? finding header for host
    const domainName = hostname?.get("host"); //?? getting doamin name from host name

    const customSubDomain = domainName
      ?.split(`${process.env.DOMAIN}`)
      .filter(Boolean)[0]; //?? filtering subdomain from doamin name
    const finishedCustomDomain = customSubDomain?.split(".")[0]; //?? removing dot from custom domain

    if (pathname.startsWith(publicApiRoute)) {
      return null;
    }

    if (pathname.startsWith("/api")) {
      if (tokenWithUserData) {
        if (tokenWithUserData.isEmailVerified && token) {
          return null;
        }
      }

      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (pathname === "/") {
      if (tokenWithUserData) {
        if (tokenWithUserData.isEmailVerified && token) {
          return NextResponse.rewrite(new URL("/overview", req.url));
        }
      }

      return NextResponse.rewrite(new URL("/landing-page", req.url));
    }

    // if (tokenWithUserData) {
    //   if (tokenWithUserData.isEmailVerified && token) {
    //     if (pathname === "/") {
    //       return NextResponse.rewrite(new URL("/overview", req.url));
    //     }
    //   }
    // }

    // if (!tokenWithUserData) {
    //   if (pathname === "/") {
    //     return NextResponse.rewrite(new URL("/landing-page", req.url));
    //   }
    // }
  },

  {
    callbacks: {
      authorized: ({ token }) => {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
