import { children } from "@/lib/types/reactComponent.type";

export default function TypographyH3({ children }: children) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}
