import { children, withClassName } from "@/lib/types/reactComponent.type";
import { cn } from "@/lib/utils/utils";

export default function TypographyH1({ children, className }: withClassName) {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
      {children}
    </h1>
  );
}
