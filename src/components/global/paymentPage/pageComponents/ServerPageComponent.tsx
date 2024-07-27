import "@/components/styles/pageStyles.css";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import { EnvelopeClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TypographyH1 from "@/components/typography/TypographyH1";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

//??: ProductPageTitle
export const ProductPageTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <TypographyH1
      className={cn(
        "text-2xl sm:text-3xl lg:text-4xl tracking-wide",
        className
      )}
    >
      {title}
    </TypographyH1>
  );
};

//??: ProductPageProfile
export const ProductPageProfile = ({
  profile = "https://github.com/shadcn.png",
  name,
  className,
}: {
  profile: string;
  name: string;
  className?: string;
}) => {
  return (
    <div className="flex items-center justify-start gap-2">
      <Avatar>
        <AvatarImage src={profile} alt="page-profile" />
        <AvatarFallback>
          <Skeleton className="h-full w-full rounded-full" />
        </AvatarFallback>
      </Avatar>
      <div>
        <p className={cn("text-base", className)}>{name}</p>
      </div>
    </div>
  );
};

//??: ProductPageDesc
export const ProductPageDesc = ({
  desc,
  TClassName,
  DClassName,
}: {
  desc: string;
  TClassName?: string;
  DClassName?: string;
}) => {
  return (
    <div className="">
      <h4 className={cn("text-lg font-semibold my-2", TClassName)}>
        Description
      </h4>
      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(`${desc}`) }} />
    </div>
  );
};

export const ProductPageContact = ({
  name,
  email,
  phone,
  TClassName,
  DClassName,
}: {
  name: string;
  email: string;
  phone: number;
  TClassName?: string;
  DClassName?: string;
}) => {
  return (
    <div className="pb-3">
      <h4 className={cn("text-lg font-semibold my-2", TClassName)}>
        Contact {name !== "" && `to ${name}`}
      </h4>
      {email !== "" && (
        <p className={cn("flex items-center justify-start gap-2", DClassName)}>
          <EnvelopeClosedIcon /> {email}
        </p>
      )}
      {phone && (
        <p className={cn("flex items-center justify-start gap-2", DClassName)}>
          <PersonIcon /> {`+91 ${phone}`}
        </p>
      )}
    </div>
  );
};

//??: ProductPageFaq
export const ProductPageFaq = ({
  trigger,
  content,
  key,
}: {
  trigger: String;
  content: String;
  key: number;
}) => {
  return (
    <div key={key} className="">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export const ProductPageFooter = ({
  title,
  containt,
  theme,
}: {
  title: string;
  containt: string;
  theme: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            `${
              theme === "dark"
                ? "text-white hover:text-white"
                : "text-black hover:text-black"
            }`
          )}
          variant="link"
        >
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[425px] ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription
            className={`${theme === "dark" ? "text-white" : "text-black"}`}
          >
            {containt}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export const WhatsappSupportBar = ({
  WNumber,
  className,
}: {
  WNumber: string;
  className?: string;
}) => {
  if (WNumber) {
    return (
      <div className={cn("w-fit h-fit fixed bottom-9 right-9", className)}>
        <Link href={`https://wa.me/+91${WNumber}`} target="_blank">
          <Image src="/whatsapp.png" alt="Whatsapp" width={55} height={5} />
        </Link>
      </div>
    );
  }
  return;
};
