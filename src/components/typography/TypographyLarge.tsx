import { children } from "@/lib/types/reactComponent.type";

export default function TypographyLarge({ children }: children) {
  return <div className="text-lg font-semibold">{children}</div>;
}
