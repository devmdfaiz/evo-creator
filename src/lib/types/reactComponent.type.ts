import { ReactNode } from "react";

export interface children {
  children?: ReactNode;
}

export interface withClassName extends children {
  className?: string
}