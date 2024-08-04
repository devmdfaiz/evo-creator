"use client";
import PuzzleIcons from "../icons/PuzzleIcons";
import ProfileIcon from "../icons/ProfileIcon";
import PageIcon from "../icons/PageIcon";
import ChatIcon from "../icons/ChatIcon";
import GearIcon from "../icons/GearIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import WalletIcon from "../icons/WalletIcon";
import { cn } from "@/lib/utils/utils";
import TypographyH2 from "../typography/TypographyH2";
import { Cross1Icon } from "@radix-ui/react-icons";
import OrderIcon from "../icons/OrderIcon";
import { Navlinks } from "@/lib/types/index.type";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { evar } from "@/lib/envConstant";
import LogoWrapper, { HeaderLogo } from "../global/wrapper/LogoWrapper";

const NavBar = ({
  isMenuOpen,
  setIsMenuOpen,
  userRoll,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (b: boolean) => void;
  userRoll: "USER" | "ADMIN";
}) => {
  const path = usePathname();

  const navlinks: Navlinks[] = [
    {
      title: "Overview",
      slug: "/",
      icon: <PuzzleIcons className="w-4 h-4" />,
    },
    {
      title: "Customers",
      slug: "/customers",
      icon: <ProfileIcon className="w-4 h-4" />,
    },
    { title: "Pages", slug: "/pages", icon: <PageIcon /> },
    // {
    //   title: "Automation",
    //   slug: "/automation",
    //   icon: <ChatIcon className="w-4 h-4" />,
    // },
    {
      title: "Orders",
      slug: "/orders",
      icon: <OrderIcon className="w-4 h-4" />,
    },
    {
      title: "Wallet",
      slug: "/wallet",
      icon: <WalletIcon className="w-4 h-4" />,
    },
    // {
    //   title: "Setting",
    //   slug: "/setting",
    //   icon: <GearIcon className="w-4 h-4" />,
    // },
  ];

  const adminNavlinks: Navlinks[] = [
    {
      title: "Overview",
      slug: "/admin",
      icon: <PuzzleIcons className="w-4 h-4" />,
    },
    {
      title: "Users",
      slug: "/admin/users",
      icon: <ProfileIcon className="w-4 h-4" />,
    },
    {
      title: "Customers",
      slug: "/admin/customers",
      icon: <ProfileIcon className="w-4 h-4" />,
    },
    { title: "Pages", slug: "/admin/pages", icon: <PageIcon /> },
    {
      title: "Orders",
      slug: "/admin/orders",
      icon: <OrderIcon className="w-4 h-4" />,
    },
  ];

  return (
    // navlinks for large screens
    <>
      <nav className="hidden lg:block">
        <ul className="flex justify-center items-center text-sm gap-2">
          {(userRoll === "USER" ? navlinks : adminNavlinks).map(
            (link, index) => (
              <li
                key={index}
                className={twMerge(
                  `text-foreground/80 hover:text-foreground/80 hover:bg-muted py-1 px-2 transition-all ease-in-out rounded-md`,
                  path === link.slug &&
                    "bg-primary hover:bg-primary text-white hover:text-white"
                )}
              >
                <Link
                  href={link.slug}
                  className="flex items-center justify-center gap-1"
                >
                  {link.icon}
                  {link.title}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* navlinks for small screens */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="left">
          <SheetHeader className="py-2">
            <SheetTitle className="text-left">
              <Link href="/">
                <LogoWrapper>
                  <HeaderLogo />
                </LogoWrapper>
              </Link>
            </SheetTitle>
            <nav className={""}>
              <ul
                className={cn(
                  "flex flex-col justify-start items-start text-sm gap-2 mt-7"
                )}
              >
                {navlinks.map((link, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setTimeout(() => {
                        setIsMenuOpen(false);
                      }, 500);
                    }}
                    className={twMerge(
                      `text-foreground/80 hover:text-foreground/80 hover:bg-muted py-1 px-2 transition-all ease-in-out rounded-md`,
                      path === link.slug &&
                        "bg-primary hover:bg-primary text-white hover:text-white"
                    )}
                  >
                    <Link
                      href={link.slug}
                      className="flex items-center justify-center gap-1"
                    >
                      {link.icon}
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavBar;
