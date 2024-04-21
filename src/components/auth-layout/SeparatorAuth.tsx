import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/utils";
import TypographyMuted from "../typography/TypographyMuted";

const SeparatorAuth = () => {
  return (
    <div className="relative">
      <Separator className={cn("my-6")} orientation="horizontal" />
      <TypographyMuted className={cn("text-center absolute left-1/2 top-[-11px] bg-card px-1")}>or</TypographyMuted>
    </div>
  )
}

export default SeparatorAuth
