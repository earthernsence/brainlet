"use client";

import { ElementRef, useRef, useState } from "react";
import { ImageIcon, Smile, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

import { useImage } from "@/hooks/use-image";

import { Button } from "@/components/ui/Button";
import { IconPicker } from "@/components/IconPicker";

interface ToolbarProps {
  initial: Doc<"documents">,
  preview?: boolean
}

export const Toolbar = ({
  initial,
  preview
}: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initial.title);

  const update = useMutation(api.documents.update);
  const remove = useMutation(api.documents.removeIcon);

  const image = useImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initial.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (val: string) => {
    setValue(val);
    update({
      id: initial._id,
      title: value || "Untitled"
    });
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initial._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    remove({
      id: initial._id
    });
  };

  return (
    <div className="pl-[54px] group relative">
      {Boolean(initial) && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initial.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4 group-hover/icon:text-red-500" />
          </Button>
        </div>
      )}
      {Boolean(initial.icon) && preview && (
        <p className="text-6xl pt-6">
          {initial.icon}
        </p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initial.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              add icon
            </Button>
          </IconPicker>
        )}
        {!initial.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            onClick={image.onOpen}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={e => onInput(e.target.value)}
          className="text-5xl font-bold break-words text-[#3F3F3F] dark:text-[#CFCFCF]
                    resize-none bg-transparent outline-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initial.title}
        </div>
      )}
    </div>
  );
};