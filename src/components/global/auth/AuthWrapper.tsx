import TypographyH1 from "@/components/typography/TypographyH1";
import TypographyP from "@/components/typography/TypographyP";
import React, { ReactNode } from "react";

const AuthWrapper = ({
  children,
  subTitle,
  title,
}: {
  children: ReactNode;
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="flex flex-wrap w-100 h-full">
      <div
        className="bg-background h-full flex-col justify-center items-center hidden xl:flex"
        style={{ flex: "1" }}
      >
        <div className="w-[90%] m-auto">
          <TypographyH1>{title}</TypographyH1>
          <TypographyP>{subTitle}</TypographyP>
        </div>
      </div>
      <div
        className="bg-card h-full flex justify-center items-center"
        style={{ flex: "1" }}
      >
        <div className="sm:w-[50%] w-[80%]">{children}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
