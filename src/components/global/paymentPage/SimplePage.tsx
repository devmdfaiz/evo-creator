import "@/components/styles/pageStyles.css";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import {
  EnvelopeClosedIcon,
  PersonIcon,
  QuoteIcon,
} from "@radix-ui/react-icons";
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

import useEmblaCarousel from "embla-carousel-react";

import { cn } from "@/lib/utils/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Item, TNImagesPreview, TTestimonials } from "@/lib/types/index.type";
import AutoScroll from "embla-carousel-auto-scroll";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  mode,
  cover,
}: {
  mode: "preview" | "production";
  cover: Item[];
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({}, [AutoScroll()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container py-3 gap-4 relative h-[500px] w-[500px] select-none">
            {cover.length > 0 &&
              cover.map((file, i) => (
                <>
                  <Image
                    className="embla__slide overflow-hidden rounded-md"
                    key={i}
                    height={500}
                    width={500}
                    src={
                      file.status !== "success"
                        ? file.fileData.localUrl!
                        : file.fileData.uploadedFileUrl!
                    }
                    alt="image"
                  />
                </>
              ))}
          </div>
        </div>
      </div>
    </>
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
  testimonials,
  theme,
  TClassName,
  DClassName,
}: {
  testimonials: TTestimonials[];
  theme: string;
  TClassName?: string;
  DClassName?: string;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container py-3 gap-4 relative h-[500px] w-[500px] select-none">
            {testimonials.map((testimonial, i) => (
              <div className="my-6" key={i}>
                <div
                  className={`border-primary/50 border-2 ${
                    theme === "dark" ? "border-white/30" : "border-black/30"
                  } p-6 rounded-3xl shadow-lg shadow-primary/20 w-80`}
                >
                  <QuoteIcon className="h-14 w-14 text-primary/70" />
                  <p className={cn("text-base font-medium", TClassName)}>
                    {testimonial.testiMsg}
                  </p>

                  <Separator className="bg-black/70 mt-2 w-3 h-[2px]" />

                  <p
                    className={cn(
                      "mt-2 font-normal text-start text-sm",
                      DClassName
                    )}
                  >
                    {testimonial.testiName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
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
