import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgePlus, Gift, MousePointerClick, Rocket } from "lucide-react";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const FEATURE_ICON_CLASS = "text-primary w-10 h-10";

const features: FeatureProps[] = [
  {
    icon: <MousePointerClick className={FEATURE_ICON_CLASS} />,
    title: "Sign Up",
    description: "Create your account in just a few clicks.",
  },
  {
    icon: <BadgePlus className={FEATURE_ICON_CLASS} />,
    title: "Create Your Payment Page",
    description: "Add details about your digital product and set your price.",
  },
  {
    icon: <Rocket className={FEATURE_ICON_CLASS} />,
    title: "Share Your Link",
    description:
      "Share your payment page link with your customers via social media, email, or your website.",
  },
  {
    icon: <Gift className={FEATURE_ICON_CLASS} />,
    title: "Get Paid",
    description:
      "Receive payments directly into your bank account as customers purchase your digital product.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Get started in just a few easy steps
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
