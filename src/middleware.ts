import { withAuth } from "next-auth/middleware";
import { nextAuthApiRoute, routesForLoggedinUsers } from "../routes";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const token = !!req.nextauth.token; //?? finding token
    const pathname = req.nextUrl.pathname; //?? finding pathname

    let hostname = req.headers; //?? finding header for host
    const domainName = hostname?.get("host"); //?? getting doamin name from host name

    const customSubDomain = domainName
      ?.split(`${process.env.DOMAIN}`)
      .filter(Boolean)[0]; //?? filtering subdomain from doamin name
    const finishedCustomDomain = customSubDomain?.split(".")[0]; //?? removing dot from custom domain

    //!! not in use
    // routesForLoggedinUsers.forEach((route) => {
    //   //?? finding routes from routesForLoggedinUsers
    //   if (finishedCustomDomain) {
    //     if (finishedCustomDomain !== domainName) {
    //       //?? cheaking finishedCustomDomain is not equal to routesForLoggedinUsers and doamin name
    //       return NextResponse.rewrite(
    //         new URL(`/${finishedCustomDomain}`, req.url)
    //       );
    //     }
    //   }
    // });

    if (domainName === process.env.DOMAIN) {
      if (finishedCustomDomain) {
        //?? cheaking finishedCustomDomain is not equal to doamin name
        if (finishedCustomDomain !== domainName) {
          return NextResponse.rewrite(
            new URL(`/${finishedCustomDomain}`, req.url)
          );
        }
      }
    }

    //?? not disturbing next auth route
    if (nextAuthApiRoute.includes(pathname)) {
      return null;
    }

    //?? condition if token aval
    if (token) {
      // if (pathname.startsWith("/overview")) {
      //   return NextResponse.redirect(new URL("/", req.url));
      // }

      if (pathname.startsWith("/pg")) {
        return null;
      }

      if (pathname.startsWith("/api/signin")) {
        return null;
      }

      if (pathname.startsWith("/api/signup")) {
        return null;
      }

      if (pathname.startsWith("/thank-you")) {
        return null;
      }

      if (pathname.startsWith("/preview")) {
        return null;
      }

      if (pathname.startsWith("/payment-page")) {
        return null;
      }
      if (pathname.startsWith("/pages")) {
        return null;
      }

      if (pathname.startsWith("/api/page")) {
        return null;
      }

      if (pathname.startsWith("/api/order")) {
        return null;
      }

      if (pathname.startsWith("/api/razorpay/payment/verify")) {
        return null;
      }

      if (routesForLoggedinUsers.includes(pathname)) {
        return null;
      }

      if (pathname === "/") {
        return NextResponse.rewrite(new URL("/overview", req.url));
      }

      if (pathname === "/sign-in" || "/sign-up") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      if (pathname === "/landing-page") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    //?? condition if token not aval
    if (!token) {
      if (pathname.startsWith("/pages")) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      if (pathname.startsWith("/api/signin")) {
        return null;
      }

      if (pathname.startsWith("/api/signup")) {
        return null;
      }

      if (pathname.startsWith("/thank-you")) {
        return null;
      }

      if (pathname.startsWith("/api/razorpay/payment/verify")) {
        return null;
      }

      if (pathname.startsWith("/api/order")) {
        return null;
      }

      if (routesForLoggedinUsers.includes(pathname)) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      if (pathname === "/") {
        return NextResponse.rewrite(new URL("/landing-page", req.url));
      }
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
