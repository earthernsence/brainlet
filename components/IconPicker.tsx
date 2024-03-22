"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/Popover";

interface IconPickerProps {
  // Interfaces are just like this. I don't know man
  // eslint-disable-next-line no-unused-vars
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
};

export const IconPicker = ({
  onChange,
  children,
  asChild
}: IconPickerProps) => {
  const themeMap = {
    "dark": Theme.DARK,
    "light": Theme.LIGHT,
  };

  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={d => onChange(d.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};