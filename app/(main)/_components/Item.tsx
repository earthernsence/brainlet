"use client";

import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";

interface ItemProps {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
}

export const Item = ({
  label,
  onClick,
  icon: Icon,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;


  return (
    <div
      role="button"
      onClick={onClick}
      style={{
        paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
      }}
      className={cn(
        `group min-h-27px text-sm py-1 pr-3 w-full flex items-center text-muted-foreground font-medium
                  hover:bg-primary/5`,
        active && "bg-primary/5 text-primary"
      )}
    >
      {/* This syntax is recommended instead of using !!id. While longer, it's more obvious as to what it does */}
      {Boolean(id) && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
          onClick={() => {}}
        >
          <ChevronIcon
            className="h-4 w-4 shrink-0 text-muted-foreground/50"
          />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">
          {documentIcon}
        </div>
      ) : (
        <Icon
          className="shrink-0 h-[18px] mr-2 text-muted-foreground"
        />
      )}
      <span className="truncate">
        {label}
      </span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5
                      font-mono text-[10px] font-medium text-muted-foreground bg-muted opacity-100">
          <span className="text-xs">CTRL</span>K
        </kbd>
      )}
    </div>
  );
};