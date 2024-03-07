"use client";

import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";

import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/Button";

// TODO: Replace placeholder images

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
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
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/no_image.png"
        height="300"
        width="300"
        alt="Empty"
        className="block dark:hidden"
      />
      <Image
        src="/no_image_dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <div className="text-2xl font-medium">
        Welcome to your brain, {user?.firstName}
      </div>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a neuron
      </Button>
    </div>
  );
};

export default DocumentsPage;