import { children } from "@/lib/types/reactComponent.type";

export default function TypographyBlockquote({ children }: children) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}
