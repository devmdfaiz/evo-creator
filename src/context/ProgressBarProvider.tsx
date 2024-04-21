"use client"
import { children } from "@/lib/types/reactComponent.type";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarProvider = ({ children }: children) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#E9570C"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBarProvider;
