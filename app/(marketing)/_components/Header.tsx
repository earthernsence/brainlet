"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

import { Button } from "@/components/ui/Button";
import Spinner from "@/components/Spinner";

export const Header = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <div className="text-3xl sm:text-5xl md:text-6xl font-bold">
        <span className="underline">Your brain</span> in one place if you can even believe that
      </div>
      <div className="text-base sm:text-xl md:text-2xl font-medium">
        Brainlet connects you to your notes <br /> in more ways than one.
      </div>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter your brain
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Start your odyssey
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
