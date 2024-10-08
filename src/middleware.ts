import { withAuth } from "next-auth/middleware";
import {
  adminApiRoute,
  adminPrivateRoutes,
  nextAuthApiRoute,
  partialPrivateEmailRoute,
  privateRoutes,
  publicAuthApiRoute,
  publicAuthRoute,
  publicPageApiRoute,
  publicRazorpayRoute,
} from "../routes";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    const token = !!req.nextauth.token; //?? finding token
    const tokenWithUserData = req.nextauth.token; //?? finding token data
    const tokenWithUserDataIsEmailVerificationStatus =
      req.nextauth?.token?.emailVerificationStatus; //?? finding token data
    const accountStatus = req.nextauth?.token?.userRole; //?? getting account status "ADMIN" or "USER"
    const pathname = req.nextUrl.pathname; //?? finding pathname

    let hostname = req.headers; //?? finding header for host
    const domainName = hostname?.get("host"); //?? getting doamin name from host name

    const customSubDomain = domainName
      ?.split(`${process.env.DOMAIN}`)
      .filter(Boolean)[0]; //?? filtering subdomain from doamin name
    const finishedCustomDomain = customSubDomain?.split(".")[0]; //?? removing dot from custom domain

    //** Admin routes management starts here */
    if (adminPrivateRoutes.includes(pathname)) {
      if (accountStatus === "ADMIN") {
        if (tokenWithUserDataIsEmailVerificationStatus === "verified") {
          return null;
        }
      }

      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.includes(adminApiRoute)) {
      if (accountStatus === "ADMIN") {
        if (tokenWithUserDataIsEmailVerificationStatus === "verified") {
          return null;
        }
      }

      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname === "/admin") {
      if (accountStatus === "ADMIN") {
        if (tokenWithUserDataIsEmailVerificationStatus === "verified") {
          return NextResponse.rewrite(new URL("/admin/overview", req.url));
        }
      }

      return NextResponse.redirect(new URL("/", req.url));
    }

    //** Routes management starts here */

    // Webhook Route
    if (pathname === "/api/order/payment-webhook") {
      const rawBody = await req.arrayBuffer();
      const encodedBody = encodeURIComponent(
        Buffer.from(rawBody).toString("utf8")
      );

      const url = new URL(req.url);
      url.searchParams.set("rawBody", encodedBody);

      return NextResponse.rewrite(url);
    }

    if (pathname === "/") {
      if (tokenWithUserData && token) {
        if (tokenWithUserDataIsEmailVerificationStatus === "verified") {
          return NextResponse.rewrite(new URL("/overview", req.url));
        }
      }

      return NextResponse.rewrite(new URL("/landing-page", req.url));
    }

    if (pathname.startsWith(publicAuthRoute)) {
      if (tokenWithUserDataIsEmailVerificationStatus === "verified") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return null;
    }

    if (privateRoutes.includes(pathname)) {
      if (tokenWithUserDataIsEmailVerificationStatus === "verified") {
        return null;
      }

      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // "/api/auth"
    if (pathname.startsWith(nextAuthApiRoute)) {
      return null;
    }

    // "/api/user"
    if (pathname.startsWith(publicAuthApiRoute)) {
      return null;
    }
    // "/api/order"
    if (pathname.startsWith("/api/order")) {
      return null;
    }

    // "/api/email"
    if (pathname.startsWith(partialPrivateEmailRoute)) {
      if (token) {
        return null;
      }

      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // "/api/page/public-page-data"
    if (pathname.startsWith(publicPageApiRoute)) {
      return null;
    }

    // "/api/razorpay"
    if (pathname.startsWith(publicRazorpayRoute)) {
      return null;
    }

    if (pathname.startsWith("/api/order/thank-you-order-data")) {
      return null;
    }
    // if (pathname.startsWith("/api/full-user-data")) {
    //   return null;
    // }

    if (pathname.startsWith("/api")) {
      if (tokenWithUserData && token) {
        if (tokenWithUserDataIsEmailVerificationStatus === "verified") {
          return null;
        }
      }

      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
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
