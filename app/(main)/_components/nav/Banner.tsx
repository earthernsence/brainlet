"use client";

import { toast } from "sonner";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Button } from "@/components/ui/Button";
import { ConfirmModal } from "@/components/modals/ConfirmModal";

interface BannerProps {
  documentId: Id<"documents">
}

export const Banner = ({
  documentId
}: BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Removing neuron...",
      success: "Neuron removed",
      error: "Failed to remove neuron."
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring neuron...",
      success: "Neuron restored!",
      error: "Failed to restore neuron."
    });
  };

  return (
    <div className="w-full bg-rose-500 dark:bg-rose-600 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>
        This page is currently binned.
      </p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore neuron
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
        Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};