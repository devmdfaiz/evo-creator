import { Button, buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SinglePricing } from "./SinglePricing";

export const Hero = () => {
  return (
    <section className="grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <p className={`${buttonVariants({ variant: "secondary" })} rounded-full`}>
          Built in India
        </p>
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Sell
            </span>{" "}
            Your
          </h1>{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Digital Products
            </span>{" "}
            Effortlessly
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Create, share, and sell with our seamless payment page platform.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link
            href="/sign-up"
            className={buttonVariants({ variant: "default" })}
          >
            Get Started <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Hero cards sections */}
      <div>
        <SinglePricing />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
