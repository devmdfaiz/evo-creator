import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { evar } from "@/lib/envConstant";
import Link from "next/link";

const AccountBlockInfo = ({
  accountStatus,
}: {
  accountStatus: "BLOCKED" | "ACTIVE";
}) => {
  return (
    <>
      {accountStatus === "BLOCKED" && (
        <Alert variant="destructive" className="mt-4">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Account Blocked</AlertTitle>
          <AlertDescription>
            Your account has been blocked. For more information, please{" "}
            <Link href={evar.waContactLink}>contact us</Link>.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default AccountBlockInfo;
