import { withClassName } from "@/lib/types/reactComponent.type";
import { cn } from "@/lib/utils/utils";

export default function TypographyH4({ children, className }: withClassName) {
  return (
    <h4 className={cn(`scroll-m-20 text-xl font-semibold tracking-wide`, className)}>
      {children}
    </h4>
  );
}
