import { cn } from "@/lib/utils/utils";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import React from "react";

const ErrorAlert = ({
  isError,
  className,
}: {
  isError: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full bg-red-100 text-red-700 border-l-4 border-red-500 px-4 py-3 rounded-lg flex items-center gap-2",
        className
      )}
    >
      <CrossCircledIcon className="text-red-500 w-10 h-10" />
      <span className="leading-[20px]">{isError}</span>
    </div>
  );
};

export default ErrorAlert;
