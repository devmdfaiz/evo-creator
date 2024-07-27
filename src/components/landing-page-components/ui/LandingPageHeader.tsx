"use client";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Menu } from "lucide-react";
import { LogoIcon } from "./Icons";
import ModeToggle from "@/components/global/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { evar } from "@/lib/envConstant";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import LogoWrapper, {
  HeaderLogo,
} from "@/components/global/wrapper/LogoWrapper";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#services",
    label: "Services",
  },
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ(s)",
  },
];

const LandingPageHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b top-0 z-40 w-full bg-white dark:bg-background py-1 overflow-hidden">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              <LogoWrapper>
                <HeaderLogo />
              </LogoWrapper>
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <Link
                    rel="noreferrer noopener"
                    href="/"
                    className="ml-2 font-bold text-xl flex"
                  >
                    <LogoWrapper>
                      <HeaderLogo />
                    </LogoWrapper>
                  </Link>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}

                  <Separator />

                  <Link
                    rel="noreferrer noopener"
                    href="/sign-up"
                    className={`border w-full ${buttonVariants({
                      variant: "default",
                    })}`}
                  >
                    Get Started
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <Link
              rel="noreferrer noopener"
              href="/sign-up"
              className={`border ${buttonVariants({ variant: "default" })}`}
            >
              Get Started
            </Link>

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default LandingPageHeader;
