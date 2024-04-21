import { children } from "@/lib/types/reactComponent.type";

export default function TypographySmall({ children }: children) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}
