"use client";

import { useConvexAuth } from "convex/react";

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";

import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { SignInButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";
import { ThemeToggle } from "@/components/theme-toggle";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScroll();

  return (
    <div className={cn(
      "z-50 bg-background fixed top-0 flex items-center w-full p-6",
      "dark:bg-dark",
      scrolled && "border-b shadow-sm"
    )}>
      <Logo />
      <div className="justify-between w-full flex items-center gap-x-2 md:ml-auto md:justify-end">
        {isLoading && (
          <Spinner />
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">
                Begin your journey
              </Button>
            </SignInButton>
          </>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};