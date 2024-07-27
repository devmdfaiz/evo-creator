import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { evar } from "@/lib/envConstant";
import Link from "next/link";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How do I create a payment page?",
    answer:
      "Simply sign up, click 'Create Payment Page', and fill in the details of your digital product.",
    value: "item-1",
  },
  {
    question: "What payment methods are supported?",
    answer: "We support UPI, credit/debit cards, net banking, and wallets.",
    value: "item-2",
  },
  {
    question: "How quickly do I receive payments?",
    answer:
      "Payments are processed instantly and directly deposited into your bank account.",
    value: "item-3",
  },
  {
    question: "Is there a monthly subscription fee?",
    answer:
      "No, our platform is free to use. We only charge a 5% fee on each transaction.",
    value: "item-4",
  },
  {
    question: "Can I customize my payment page?",
    answer:
      "Yes, you can tailor your payment pages to match your brand’s look and feel.",
    value: "item-5",
  },
  {
    question: "What types of digital products can I sell?",
    answer:
      "You can sell e-books, digital art, software, music, videos, and more.",
    value: "item-6",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <Link
          target="_blank"
          href={evar.waContactLink}
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </Link>
      </h3>
    </section>
  );
};
