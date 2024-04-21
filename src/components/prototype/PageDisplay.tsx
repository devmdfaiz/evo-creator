import React from "react";
import PaymentsPagePatterns from "../global/patterns/PaymentsPagePatterns";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import { Separator } from "../ui/separator";
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

import QuoteIcon from "../icons/QuoteIcon";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils/utils";

const PageDisplay = () => {
  const desc = `<div class="pp-block__text"><p>🔥 Special Offer: Grab all 4 bundles, worth thousands, for just ₹399! 🔥</p><p>Why pay more when you can get more for less? Our Mega POD Design Bundle is curated to provide you with an endless variety, ensuring you never run out of fresh and trendy designs to delight your customers.</p><h3>Benefits:</h3><p>Stock up, stand out, and scale your print-on-demand business with our Mega POD Design Bundle. Seize the offer before it’s gone. Add to the cart and let your designs do the talking!</p><div><ul><li>Cost-Effective: Massive savings with one bundled price.</li><li>Endless Variety: Refresh your product line or start a brand-new collection.</li><li>High-Quality Designs: Professionally crafted designs to ensure optimal print quality.</li><li>One-Time Purchase, Lifetime Access: Once you’ve got it, it’s yours to use forever.</li></ul><ul><li>Lifetime Access</li><li>No Download Limit</li></ul></div><div></div></div>`;

  const pageName = "facebook.com";

  const sanitizedDesc = sanitizeHtml(desc);
  const color = "#E9570C";

  return (
    <div className="flex w-full h-full">
      <div className="h-full bg-white" style={{ flex: "1" }}>
        <div className={`bg-[${color}] w-full h-[8px]`} />

        {/* Page containt wrapper */}
        <div className="w-[530px] h-full mx-auto">
          {/* Title */}
          <h1 className="text-3xl font-bold mt-10">
            Best POD (Print on Demand) Bundle 4-in-1
          </h1>

          {/* Profile section */}
          <div className="flex items-center justify-start gap-3 my-6">
            <div className="rounded-[50%] overflow-hidden w-fit h-fit">
              <Image
                src="/facebook.png"
                alt="page-profile"
                width={30}
                height={30}
                objectFit="cover"
              />
            </div>
            <div>
              <p className="text-lg">{pageName}</p>
            </div>
          </div>

          {/* Cover */}
          <div className="my-6 rounded-md overflow-hidden h-fit w-fit">
            <Image
              src="/cover.png"
              alt="cover"
              width={530}
              height={530}
              objectFit="contain"
            />
          </div>

          {/* desc */}
          <div className="my-6">
            <h4 className="text-lg font-semibold my-2">Description</h4>
            <div dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
          </div>

          <Separator className="bg-black/20" />

          {/* contact */}
          <div className="my-6">
            <h4 className="text-lg font-semibold my-2">Contact {pageName}</h4>
            <p className="flex items-center justify-start gap-2">
              <EnvelopeClosedIcon /> contact@layaro.shop
            </p>
            <p className="flex items-center justify-start gap-2">
              <PersonIcon /> 9696293133
            </p>
          </div>

          <Separator className="bg-black/20" />
          {/* testimonial */}

          <div className="my-6">
            <h4 className="text-lg font-semibold my-2">Testimonials</h4>
            <div className="flext flex-col items-center border border-black/30 p-4 rounded-sm shadow-lg">
              <QuoteIcon />
              <p className="text-lg font-medium">
                "Flowbite is just awesome. It contains tons of predesigned
                components and pages starting from login screen to complex
                dashboard. Perfect choice for your next SaaS application."
              </p>

              <div className="flex justify-center">
                <Separator className="bg-black/70 mt-2 w-3 h-[2px]" />
              </div>

              <p className="mt-2 font-medium text-center">Micheal Gough</p>
            </div>
          </div>

          {/* faq */}
          <div className="my-6">
            <h4 className="text-lg font-semibold my-2">
              Frequently Asked Question(s)
            </h4>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* footer */}
          <div className="my-6 flex gap-2 justify-center items-center flex-wrap">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className={cn("text-black hover:text-black")}
                  variant="link"
                >
                  Refund Policy
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className={cn("text-black hover:text-black")}
                  variant="link"
                >
                  Privecy Policy
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Pattern wrapper */}
      <div className="w-full" style={{ flex: ".3" }}>
        <PaymentsPagePatterns />
      </div>
    </div>
  );
};

export default PageDisplay;
