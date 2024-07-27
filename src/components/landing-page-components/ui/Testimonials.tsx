import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://github.com/shadcn.png",
    name: "Aarav S.",
    comment:
      "This platform made selling my e-books so much easier! Highly recommend.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Priya M.",
    comment:
      "I love how quick and simple it is to set up a payment page. No hassle at all.",
  },

  {
    image: "https://github.com/shadcn.png",
    name: "Rohan K.",
    comment:
      "The customizable pages helped me keep my brand consistent. Great service!",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Sneha R.",
    comment:
      "The 5% transaction fee is totally worth it for the convenience and features provided.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Vikram P.",
    comment:
      "Customer support is top-notch. They helped me set up my first payment page effortlessly.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Ananya T.",
    comment:
      "Being able to accept multiple payment options has boosted my sales significantly.",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        What Our
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Users{" "}
        </span>
        Are Saying
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Hear from our satisfied customers
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, comment }: TestimonialProps, i: number) => (
            <Card
              key={i}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage alt="" src={image} />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
