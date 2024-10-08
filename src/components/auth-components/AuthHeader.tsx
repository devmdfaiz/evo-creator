"use client";
import Link from "next/link";
import TypographyH3 from "../typography/TypographyH3";
import { usePathname } from "next/navigation";
import { evar } from "@/lib/envConstant";
import LogoWrapper, { HeaderLogo } from "../global/wrapper/LogoWrapper";

const AuthHeader = () => {
  const path = usePathname();

  return (
    <>
      <header className="py-3 px-5 md:px-10 border-b border-border flex justify-between items-center bg-card shadow relative">
        <Link href="/">
          <LogoWrapper>
            <HeaderLogo />
          </LogoWrapper>
        </Link>
        {path.includes("/sign-up") ? (
          <Link
            className="bg-primary absolute top-0 right-0 bottom-0 w-24 flex justify-center items-center"
            href="/sign-in"
          >
            Sign in
          </Link>
        ) : (
          <Link
            className="bg-primary absolute top-0 right-0 bottom-0 w-24 flex justify-center items-center"
            href="/sign-up"
          >
            Sign up
          </Link>
        )}
      </header>
    </>
  );
};

export default AuthHeader;
