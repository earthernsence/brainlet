"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSettings } from "@/hooks/use-settings";

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <div className="text-lg font-medium">
            settings
          </div>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">customise how Brainlet looks on your device</span>
          </div>
          <ThemeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};