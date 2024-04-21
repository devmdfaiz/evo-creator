"use client";
// This is header for dashboard pages
import ModeToggle from "../global/ThemeToggle";
import TypographyH3 from "../typography/TypographyH3";
import NavBar from "./NavBar";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const DashBoardHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="py-3 px-5 md:px-10 border-b border-border flex justify-between items-center bg-card shadow">
      <div onClick={() => setIsMenuOpen(true)} className="lg:hidden">
        <HamburgerMenuIcon className="w-5 h-5" />
      </div>
      <div className="flex items-center justify-center gap-5">
        <TypographyH3>Dream Project</TypographyH3>
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      </div>

      <div className="flex gap-3">
        {/* Profile button */}
        <ModeToggle />
      </div>
    </header>
  );
};

export default DashBoardHeader;
