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
import { Separator } from "@/components/ui/separator";
import QuoteIcon from "@/components/icons/QuoteIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

//??: ProductPageTitle
export const ProductPageTitle = ({
  title = "Best POD (Print on Demand) Bundle 4-in-1",
  className,
}: {
  title: string;
  className?: string;
}) => {
  return <h1 className={cn("text-3xl font-bold mt-10", className)}>{title}</h1>;
};

//??: ProductPageProfile
export const ProductPageProfile = ({
  profile = "/facebook.png",
  name = "facebook.com",
  className,
}: {
  profile: string;
  name: string;
  className?: string;
}) => {
  return (
    <div className="flex items-center justify-start gap-3 my-6">
      <div className="rounded-[50%] overflow-hidden w-fit h-fit ">
        <Image
          src={`${profile}`}
          alt="page-profile"
          width={30}
          height={30}
          objectFit="cover"
        />
      </div>
      <div>
        <p className={cn("text-lg", className)}>{name}</p>
      </div>
    </div>
  );
};

//??: ProductPageCover
export const ProductPageCover = ({
  cover = "/cover.png",
}: {
  cover: String;
}) => {
  return (
    <div className="my-6 rounded-md overflow-hidden h-[400px] sm:h-[530] w-full relative">
      <Image
        src={`${cover}`}
        alt="cover"
        fill
        objectFit="contain"
        className=""
      />
    </div>
  );
};

//??: ProductPageDesc
export const ProductPageDesc = ({
  desc = "this is description",
  TClassName,
  DClassName,
}: {
  desc: string;
  TClassName?: string;
  DClassName?: string;
}) => {
  return (
    <div className="my-6">
      <h4 className={cn("text-lg font-semibold my-2", TClassName)}>
        Description
      </h4>
      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(`${desc}`) }} />
    </div>
  );
};

export const ProductPageContact = ({
  name = "facebook.com",
  email = "contact@layaro.shop",
  phone = 9696293133,
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
    <div className="my-6">
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
          <PersonIcon /> {`+91${phone}`}
        </p>
      )}
    </div>
  );
};

//??: ProductPageTestimonial
export const ProductPageTestimonial = ({
  name = "Md Faizan",
  text = "this is my review",
  theme,
  key,
  TClassName,
  DClassName,
}: {
  name: string;
  text: string;
  theme: string;
  key: number;
  TClassName?: string;
  DClassName?: string;
}) => {
  return (
    <div className="my-6" key={key}>
      <div
        className={`flext flex-col items-center border ${
          theme === "dark" ? "border-white/30" : "border-black/30"
        } p-4 rounded-sm shadow-lg`}
      >
        <QuoteIcon className="h-9" />
        <p className={cn("text-base font-medium", TClassName)}>{`"${text}"`}</p>

        <div className="flex justify-center">
          <Separator className="bg-black/70 mt-2 w-3 h-[2px]" />
        </div>

        <p className={cn("mt-2 font-normal text-center text-sm", DClassName)}>
          {name}
        </p>
      </div>
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
    <div key={key} className="my-6">
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

export const WhatsappSupprotBar = ({
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
          <Image src="/whatsapp.png" alt="Whatsapp" width={65} height={65} />
        </Link>
      </div>
    );
  }
  return;
};
