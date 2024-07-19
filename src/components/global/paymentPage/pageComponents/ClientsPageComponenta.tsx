"use client";
import "@/components/styles/pageStyles.css";
import Image from "next/image";
import { QuoteIcon } from "@radix-ui/react-icons";

import useEmblaCarousel from "embla-carousel-react";

import { cn } from "@/lib/utils/utils";
import { Separator } from "@/components/ui/separator";
import { Item, TTestimonials } from "@/lib/types/index.type";
import AutoScroll from "embla-carousel-auto-scroll";
import { useCallback } from "react";
import {
  DotButton,
  useDotButton,
} from "../../emblaCarousel/EmblaCarouselDotButton";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../../emblaCarousel/EmblaCarouselArrowButtons";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { pageCarouselThemeProvider } from "@/lib/constants/index.constant";

export const ProductPageCover = ({
  cover,
  theme,
}: {
  cover: Item[];
  theme: string;
}) => {
  const pageCarouselTheme = pageCarouselThemeProvider(theme);

  return (
    <div className="flex w-full h-fit justify-center items-center">
      <Carousel className="w-full md:max-w-lg max-w-52 sm:max-w-md">
        <CarouselContent>
          {cover.length > 0 &&
            cover.map((file, i) => (
              <CarouselItem key={i}>
                <img
                  className="rounded-md"
                  src={file.fileData.uploadedFileUrl!}
                  alt="image"
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className={pageCarouselTheme} />
        <CarouselNext className={pageCarouselTheme} />
      </Carousel>
    </div>
  );
};

//??: ProductPageTestimonial
export const ProductPageTestimonial = ({
  testimonials,
  color,
  TClassName,
  DClassName,
  theme,
}: {
  testimonials: TTestimonials[];
  color: string;
  TClassName?: string;
  DClassName?: string;
  theme: string;
}) => {
  const pageCarouselTheme = pageCarouselThemeProvider(theme);

  return (
    <>
      <div className="flex w-full h-fit justify-center items-center mt-6">
        <Carousel className="w-full md:max-w-lg max-w-52 sm:max-w-md xl:max-w-2xl">
          <CarouselContent>
            {testimonials.length > 0 &&
              testimonials.map((testimonial, i) => (
                <CarouselItem key={i}>
                  <div
                    key={i}
                    className={`border-2 p-6 rounded-3xl w-full`}
                    style={{ borderColor: color }}
                  >
                    <QuoteIcon className="h-10 w-10" style={{ color: color }} />
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
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className={pageCarouselTheme} />
          <CarouselNext className={pageCarouselTheme} />
        </Carousel>
      </div>
    </>
  );
};
