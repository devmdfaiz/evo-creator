import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { children } from "@/lib/types/reactComponent.type";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const InfoTooltip = ({ children }: children) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type="button">
          <InfoCircledIcon />
        </TooltipTrigger>
        <TooltipContent>
          <p>{children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
