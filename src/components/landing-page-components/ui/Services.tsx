import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FilePenLine,
  Nfc,
  ShieldCheck,
  Timer,
  WalletMinimal,
} from "lucide-react";
import Image from "next/image";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const SERVICE_ICON_CLASS = "text-primary w-10 h-10";

const serviceList: ServiceProps[] = [
  {
    title: "Easy Setup",
    description:
      "Create a payment page in minutes without any technical skills.",
    icon: <Timer className={SERVICE_ICON_CLASS} />,
  },
  {
    title: "Secure Payments",
    description:
      "Ensure your transactions are safe with our secure payment gateway.",
    icon: <ShieldCheck className={SERVICE_ICON_CLASS} />,
  },
  {
    title: "Multiple Payment Options",
    description: "Accept payments via UPI, credit/debit cards, and more.",
    icon: <Nfc className={SERVICE_ICON_CLASS} />,
  },
  {
    title: "Customizable Pages",
    description:
      "Tailor your payment pages to match your brand’s look and feel.",
    icon: <FilePenLine className={SERVICE_ICON_CLASS} />,
  },
  {
    title: "Instant Payouts",
    description:
      "Get your earnings directly in your bank account without delays.",
    icon: <WalletMinimal className={SERVICE_ICON_CLASS} />,
  },
];

export const Services = () => {
  return (
    <section className="py-24 sm:py-32" id="services">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Why Choose{" "}
            </span>
            Our Platform?
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Everything you need to sell your digital products seamlessly.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative h-full w-[300px] md:w-[500px] lg:w-[600px]">
          <Image
            src="/cube-leg.png"
            className="object-contain"
            alt="About services"
            fill
          />
        </div>
      </div>
    </section>
  );
};
