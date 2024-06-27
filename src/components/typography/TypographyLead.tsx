import { children } from "@/lib/types/reactComponent.type";

export default function TypographyLead({ children }: children) {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}
