"use client";

import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";

import { useEdgeStore } from "@/lib/edgestore";

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/Dialog";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useImage } from "@/hooks/use-image";

export const ImageModal = () => {
  const params = useParams();

  const update = useMutation(api.documents.update);

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const image = useImage();
  const { edgestore } = useEdgeStore();

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    image.onClose();
  };

  const onChange = async(uploadedFile?: File) => {
    if (uploadedFile) {
      setIsSubmitting(true);
      setFile(uploadedFile);

      const res = await edgestore.publicFiles.upload({
        file: uploadedFile,
        options: { replaceTargetUrl: image.url }
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url
      });

      onClose();
    }
  };

  return (
    <Dialog open={image.isOpen} onOpenChange={image.onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="text-lg text-center font-semibold">
            image
          </div>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};