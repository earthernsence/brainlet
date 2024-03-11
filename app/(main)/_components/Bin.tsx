"use client";

import React, { useState } from "react";
import { Search, Trash, Undo } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Input } from "@/components/ui/Input";
import Spinner from "@/components/Spinner";

export const Bin = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getBin);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter(doc => doc.title.toLowerCase().includes(search.toLowerCase()));

  const onClick = (docId: string) => {
    router.push(`/documents/${docId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    docId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: docId });

    toast.promise(promise, {
      loading: "Restoring neuron...",
      success: "Neuron restored!",
      error: "Failed to restore neuron."
    });
  };

  const onRemove = (
    docId: Id<"documents">
  ) => {
    const promise = remove({ id: docId });

    toast.promise(promise, {
      loading: "Removing neuron...",
      success: "Neuron removed!",
      error: "Failed to remove neuron."
    });

    if (params.documentId === docId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) return (
    <div className="h-full flex items-center justify-center p-4">
      <Spinner size="lg" />
    </div>
  );

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="filter by title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          no neurons in bin
        </p>
        {filteredDocuments?.map(doc => (
          <div
            key={doc._id}
            role="button"
            onClick={() => onClick(doc._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">
              {doc.title}
            </span>
            <div className="flex items-center">
              <div
                onClick={e => onRestore(e, doc._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(doc._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};