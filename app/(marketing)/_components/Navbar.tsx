"use client";

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";

import { Logo } from "./Logo";
import { ThemeToggle } from "@/components/theme-toggle";

export const Navbar = () => {
  const scrolled = useScroll();

  return (
    <div className={cn(
      "z-50 bg-background fixed top-0 flex items-center w-full p-6",
      "dark:bg-dark",
      scrolled && "border-b shadow-sm"
    )}>
      <Logo />
      <div className="justify-between w-full flex items-center gap-x-2 md:ml-auto md:justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
};