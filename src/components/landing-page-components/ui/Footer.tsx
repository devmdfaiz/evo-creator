import { evar } from "@/lib/envConstant";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import LogoWrapper, {
  HeaderLogo,
} from "@/components/global/wrapper/LogoWrapper";

interface TFooterLinks {
  title: string;
  path: string;
  target: string;
}

const footerLinks: TFooterLinks[] = [
  {
    title: "Privacy Policy",
    path: "/privacy-policy",
    target: "_self",
  },
  {
    title: "Terms & Conditions",
    path: "/terms-and-conditions",
    target: "_self",
  },
  {
    title: "Refund & Cancellation",
    path: "/refund-and-cancellation",
    target: "_self",
  },
  {
    title: "Disclaimer",
    path: "/disclaimer",
    target: "_self",
  },
  {
    title: "Contact Us",
    path: evar.waContactLink,
    target: "_blank",
  },
];

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="py-20 flex justify-between items-center gap-y-4 flex-wrap">
        <div className="col-span-full xl:col-span-2">
          <Link href="/">
            <LogoWrapper>
              <HeaderLogo />
            </LogoWrapper>
          </Link>
        </div>

        <div className="grow">
          <nav className="w-full">
            <ul className="flex flex-wrap justify-start lg:justify-end gap-2 w-full">
              {footerLinks.map((footerLink: TFooterLinks, i: number) => (
                <li key={i}>
                  <Link
                    href={footerLink.path}
                    target={footerLink.target}
                    className={`${buttonVariants({
                      variant: "link",
                    })} text-black dark:text-white`}
                  >
                    {footerLink.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="pb-14 text-center">
        <h3>&copy; 2024 {evar.projectName}. All rights reserved.</h3>
      </section>
    </footer>
  );
};
