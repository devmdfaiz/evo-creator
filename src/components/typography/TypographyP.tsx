import { withClassName } from "@/lib/types/reactComponent.type";
import { cn } from "@/lib/utils/utils";

export default function TypographyP({ children, className }: withClassName) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}
