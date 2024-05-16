import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import {
  Cross1Icon,
  CrossCircledIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ErrorAlert = ({
  isError,
  className,
  setIsError,
}: {
  isError: string;
  className?: string;
  setIsError: any;
}) => {
  if (isError) {
    setTimeout(() => {
      setIsError("");
    }, 7000);
  }

  return (
    <Alert variant="destructive">
      <InfoCircledIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{isError}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
