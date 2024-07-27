import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import React, { ReactNode } from "react";

const LogoWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative w-[150px] md:w-[160px] lg:w-[180px]  xl:w-[200px] lg:h-[50px] md:h-[40px] h-[30px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const HeaderLogo = () => {
  return (
    <>
      {" "}
      <Image
        src="/logo-black.png"
        fill
        className="dark:hidden object-cover"
        alt="logo"
      />
      <Image
        src="/logo-white.png"
        fill
        className="hidden dark:block object-cover"
        alt="logo"
      />
    </>
  );
};

export default LogoWrapper;
