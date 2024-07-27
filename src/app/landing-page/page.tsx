import { SinglePricing } from "@/components/landing-page-components/ui/SinglePricing";
import { FAQ } from "@/components/landing-page-components/ui/FAQ";
import { Footer } from "@/components/landing-page-components/ui/Footer";
import { Hero } from "@/components/landing-page-components/ui/Hero";
import { HowItWorks } from "@/components/landing-page-components/ui/HowItWorks";
import { ScrollToTop } from "@/components/landing-page-components/ui/ScrollToTop";
import { Services } from "@/components/landing-page-components/ui/Services";
import { Testimonials } from "@/components/landing-page-components/ui/Testimonials";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import LandingPageWrapper from "@/components/landing-page-components/LandingPageWrapper";
import { About } from "@/components/landing-page-components/ui/About";

const LandingPage = () => {
  return (
    <LandingPageWrapper>
      <Hero />
      <HowItWorks />
      <Services />
      <Testimonials />
      <About />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </LandingPageWrapper>
  );
};

export default LandingPage;
