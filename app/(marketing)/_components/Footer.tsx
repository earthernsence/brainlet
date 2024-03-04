import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

export const Footer = () => (
  <div className="flex items-center w-full p-6 bg-background z-50">
    <Logo />
    <div className="md:ml-auto w-full justify-betwen md:justify-end flex items-center gap-x-2 text-muted-foreground">
      <Button variant="ghost" size="sm">
        Privacy
      </Button>
      <Button variant="ghost" size="sm">
        Terms
      </Button>
    </div>
  </div>
);

