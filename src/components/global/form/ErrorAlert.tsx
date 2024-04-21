import { InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";

const ErrorAlert = ({ isError }: { isError: string }) => {
  return (
    <div className="w-full bg-primary/50 px-3 py-2 rounded-sm my-2 flex gap-2 items-center justify-start">
      <InfoCircledIcon /> {isError}
    </div>
  );
};

export default ErrorAlert;
