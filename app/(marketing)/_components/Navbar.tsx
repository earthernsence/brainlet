"use client";

import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useScrollTop } from "@/hooks/use-scroll-top";

export const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div className={cn(
      "z-50 bg-background fixed top-0 flex items-center w-full p-6",
      scrolled && "border-b-shadow-sm"
    )}>
      Navbar
      <Logo />
    </div>
  );
};