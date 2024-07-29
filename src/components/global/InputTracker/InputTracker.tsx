import TypographyP from "@/components/typography/TypographyP";
import React from "react";

const InputTracker = ({ current, max }: { current: string; max: number }) => {
  return <TypographyP>{`(${current.length}/${max})`}</TypographyP>;
};

export default InputTracker;
