"use client";

import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";

import { Navigation } from "./_components/Navigation";
import { Spinner } from "@/components/Spinner";

const MainLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-dark">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;