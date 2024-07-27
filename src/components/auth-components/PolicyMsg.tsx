import React from "react";
import TypographyMuted from "../typography/TypographyMuted";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils/utils";

const PolicyMsg = () => {
  return (
    <TypographyMuted className="text-center">
      By clicking continue, you agree to our{" "}
      <Link
        href="/terms-and-conditions"
        className={cn(buttonVariants({ variant: "link" }), "p-0")}
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy-policy"
        className={cn(buttonVariants({ variant: "link" }), "p-0")}
      >
        Privacy Policy
      </Link>{" "}
      .
    </TypographyMuted>
  );
};

export default PolicyMsg;
