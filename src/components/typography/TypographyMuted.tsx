import {  withClassName } from "@/lib/types/reactComponent.type";
import { cn } from "@/lib/utils/utils";

export default function TypographyMuted({ children, className }: withClassName) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}
