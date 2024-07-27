"use client";
import { buttonVariants } from "@/components/ui/button";
import { evar } from "@/lib/envConstant";
import { cn } from "@/lib/utils/utils";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SupportBar = () => {
  const path = usePathname();

  return (
    <>
      <div className="rounded-full overflow-hidden w-fit h-fit fixed right-10 bottom-7">
        <Link
          href={evar.waContactLink}
          target="_blank"
          className={cn(
            buttonVariants({ variant: "default", size: "icon" }),
            "w-12 h-12"
          )}
        >
          <MessageCircle />
        </Link>
      </div>
    </>
  );
};

export default SupportBar;
