import { withClassName } from "@/lib/types/reactComponent.type";
import { cn } from "@/lib/utils/utils";

export default function TypographyH2({ children, className }: withClassName) {
  return (
    <h2 className={cn(`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`,)}>
      {children}
    </h2>
  );
}
