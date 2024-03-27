"use client";

import "@blocknote/react/style.css";

import { useQuery } from "convex/react";
import { useTheme } from "next-themes";

import {
  BlockNoteSchema,
  defaultInlineContentSpecs,
  filterSuggestionItems,
  PartialBlock
} from "@blocknote/core";
import {
  BlockNoteView,
  DefaultReactSuggestionItem,
  SuggestionMenuController,
  useCreateBlockNote
} from "@blocknote/react";

import { useEdgeStore } from "@/lib/edgestore";

import { api } from "@/convex/_generated/api";

import { DocumentLink } from "@/blocknote/DocumentLink";

interface EditorProps {
  // Interfaces are just like this. I don't know man
  // eslint-disable-next-line no-unused-vars
  onChange: (val: string) => void;
  initialContent?: string,
  editable?: boolean;
}

const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    documentLink: DocumentLink
  }
});

const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async(file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };

  const editor: typeof schema.BlockNoteEditor = useCreateBlockNote({
    schema,
    initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
    uploadFile: handleUpload
  });

  const updateEditor = () => {
    onChange(JSON.stringify(editor.document, null, 2));
  };

  const documents = useQuery(api.documents.get);

  const getLinkMenuItems = (
    edit: typeof schema.BlockNoteEditor
  ): DefaultReactSuggestionItem[] => {

    if (!documents) return [{
      title: "No documents found",
      onItemClick: () => undefined
    }];

    return documents?.map(doc => ({
      title: doc.title,
      onItemClick: () => {
        edit.insertInlineContent([
          {
            type: "documentLink",
            props: {
              link: `/documents/${doc._id}`,
              title: doc.title
            }
          },
          " "
        ]);
      }
    }));
  };

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editable={editable}
        onChange={updateEditor}
      >
        <SuggestionMenuController
          triggerCharacter={"$"}
          // eslint-disable-next-line require-await
          getItems={async query =>
            filterSuggestionItems(getLinkMenuItems(editor), query)
          }
        />
      </BlockNoteView>
    </div>
  );
};

export default Editor;