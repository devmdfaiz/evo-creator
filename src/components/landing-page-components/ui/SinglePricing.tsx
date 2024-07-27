import { Check } from "lucide-react";
import { Statistics } from "./Statistics";

interface TPricingList {
  title: string;
  description: string;
  benefitList: string[];
}

const pricingList: TPricingList[] = [
  {
    title: "Simple, Transparent Pricing",
    description:
      "Our platform is free to use. We only charge a 5% fee on each transaction. No hidden fees, no monthly charges.",

    benefitList: [
      "Free to create and manage your payment pages",
      "5% fee on every transaction",
      "No monthly subscription fees",
      "Unlimited payment pages",
    ],
  },
];

export const SinglePricing = () => {
  return (
    <section id="price" className="py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  Simple, Transparent{" "}
                </span>
                Pricing
              </h2>
              {pricingList.map((price: TPricingList, i: number) => (
                <div key={i}>
                  <div className="py-2">
                    <p>{price.description}</p>
                  </div>
                  {price.benefitList.map((benefit: string, i: number) => (
                    <div key={i} className="py-1">
                      <span className="flex">
                        <Check className="text-green-500" />{" "}
                        <h3 className="ml-2">{benefit}</h3>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* <Statistics /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
