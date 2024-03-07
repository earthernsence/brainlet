"use client";

import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useMutation, useQuery } from "convex/react";

import { ChevronsLeft, MenuIcon, PlusCircle, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

import { Item } from "./Item";
import { UserItem } from "./UserItem";
import { toast } from "sonner";

export const Navigation = () => {
  // This is the breakpoint for Tailwind's md class; we use it here to automatically
  // collapse the sidebar when using the application on a mobile device as opposed to a desktop
  const isMobile = useMediaQuery("(max-width: 768px)");
  // Same thing here. When a user clicks on a document on the sidebar on mobile, we want to
  // automatically collapse the sidebar so that it doesn't continue to take up unneeded space
  const pathname = usePathname();

  const documents = useQuery(api.documents.get);
  const create = useMutation(api.documents.create);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = e.clientX;
    if (newWidth < 240) newWidth = 240;
    else if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    // This grabs the date in format YYYY-MM-DD in an effort to automatically create some organisation
    const d = new Date().toISOString().substring(0, 10);
    const promise = create({ title: `${d} Untitled` });

    toast.promise(promise, {
      loading: "Creating a new neuron...",
      success: "New neuron created!",
      error: "Failed to create a new neuron."
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div>
          <div
            role="button"
            onClick={collapse}
            className={cn(
              `absolute top-3 right-2 h-6 w-6
              text-muted-foreground rounded-sm
              opacity-0 group-hover/sidebar:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600
              transition`,
              isMobile && "opacity-100"
            )}
          >
            <ChevronsLeft className="h-6 w-6" />
          </div>
          <div>
            <UserItem />
            <Item 
              label="search..."
              icon={Search}
              isSearch
              onClick={() => {}}
            />
            <Item 
              label="settings"
              icon={Settings}
              onClick={() => {}}
            />
            <Item
              onClick={handleCreate}
              label="new neuron"
              icon={PlusCircle}
            />
          </div>
        </div>
        <div className="mt-4">
          {documents?.map(document => (<p key={document._id}>{document.title}</p>))}
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="absolute h-full w-1 right-0 top-0
                    opacity-0 group-hover/sidebar:opacity-100 bg-primary/10
                    transition cursor-ew-resize"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100% - 15rem)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && <MenuIcon role="button" onClick={resetWidth} className="h-6 w-6 text-muted-foreground" />}
        </nav>
      </div>
    </>
  );
};