import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";
import { evar } from "@/lib/envConstant";

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                {evar.projectName}
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                <b>Empowering Digital Entrepreneurs</b>
                <br />
                At {evar.projectName}, we believe in making it easy for anyone
                to sell digital products online. Our platform provides a
                seamless solution to create, share, and manage payment pages,
                allowing you to focus on what you do best: creating great
                digital products. With secure transactions, customizable pages,
                and instant payouts, we’re here to support your journey to
                success. Join our community of digital entrepreneurs today and
                start selling with ease.
              </p>
            </div>

            {/* <Statistics /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
