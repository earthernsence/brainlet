"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Header = () => (
  <div className="max-w-3xl space-y-4">
    <div className="text-3xl sm:text-5xl md:text-6xl font-bold">
      <span className="underline">Epic notes</span> in one place if you can even believe that
    </div>
    <div className="text-base sm:text-xl md:text-2xl font-medium">
      Epic notes connects you to your notes <br /> in more ways than one.
    </div>
    <Button>
    Enter Epic Notes App
      <ArrowRight className="h-4 w-4 ml-2" />
    </Button>
  </div>
);
