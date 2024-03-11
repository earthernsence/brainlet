"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

import { Banner } from "./nav/Banner";
import { Menu } from "./nav/Menu";
import { Publish } from "./nav/Publish";
import { Title } from "./nav/Title";

interface NavbarProps {
  isCollapsed: boolean,
  onResetWidth: () => void;
}

export const Navbar = ({
  isCollapsed,
  onResetWidth
}: NavbarProps) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, { documentId: params.documentId as Id<"documents"> });

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-dark px-3 py-2 w-full flex items-center gap-x-4 justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) return null;

  return (
    <>
      <nav className="bg-background dark:bg-dark px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (<MenuIcon role="button" onClick={onResetWidth} className="h-6 w-6 text-muted-foreground" />)}
        <div className="flex items-center justify-between w-full">
          <Title initial={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && (
        <Banner documentId={document._id} />
      )}
    </>
  );
};