import { cn } from "@/lib/utils/utils";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

const GoogleAuthButton = () => {
  return (
    <Button
      className={cn(
        "bg-white text-black w-full mb-6 flex items-center justify-center gap-2 hover:bg-white "
      )}
      onClick={() => {
        signIn("google", { redirect: false });
      }}
    >
      <Image src="/google.png" alt="goole-icon" width={18} height={18} /> Go
      with Google
    </Button>
  );
};

export default GoogleAuthButton;
