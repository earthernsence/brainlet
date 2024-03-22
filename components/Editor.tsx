"use client";

import "@blocknote/react/style.css";

import { useMutation, useQuery } from "convex/react";
import { useTheme } from "next-themes";

import { BlockNoteEditor, BlockNoteSchema, defaultInlineContentSpecs, filterSuggestionItems, PartialBlock } from "@blocknote/core";
import { BlockNoteView, DefaultReactSuggestionItem, SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";

import { useEdgeStore } from "@/lib/edgestore";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { DocumentLink } from "@/blocknote/DocumentLink";
import { Tag } from "@/blocknote/Tag";

interface EditorProps {
  onChange: (val: string) => void;
  initialContent?: string,
  editable?: boolean;
  documentId: Id<"documents">;
}

const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    documentLink: DocumentLink,
    tag: Tag
  }
});

const Editor = ({
  onChange,
  initialContent,
  documentId,
  editable
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async(file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    uploadFile: handleUpload
  });

  const updateEditor = () => {
    onChange(JSON.stringify(editor.document, null, 2));
  };

  const documents = useQuery(api.documents.get);
  const tags = useQuery(api.documents.getUserTags);
  const document = useQuery(api.documents.getById, { documentId });

  const update = useMutation(api.documents.update);

  const addTag = (tag: string) => {
    if (!document) return;
    let newTags: Array<string> = [];

    if (document.tags === undefined) {
      newTags = [tag];
    } else {
      if (document.tags.includes(tag)) return;
      newTags = [...document.tags, tag];
    }

    update({
      id: documentId,
      tags: newTags
    });
  };

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

  const getTagsMenuItems = (
    edit: typeof schema.BlockNoteEditor
  ): DefaultReactSuggestionItem[] => {
    if (!tags) return [{
      title: "This is never used",
      onItemClick: () => undefined
    }];

    return tags.filter(tag => !document?.tags?.includes(tag)).map(tag => ({
      title: tag,
      onItemClick: () => {
        edit.insertInlineContent([
          {
            type: "tag",
            props: {
              title: tag,
            }
          },
          " "
        ]);
      }
    }));
  };

  const filterTagItems = (
    edit: typeof schema.BlockNoteEditor,
    query: string
  ) => {
    const items = getTagsMenuItems(edit);
    const filteredItems = filterSuggestionItems(items, query);
    if (!tags || filteredItems.length === 0) {
      return [{
        title: "Create new tag",
        onItemClick: () => {
          addTag(query);

          edit.insertInlineContent([
            {
              type: "tag",
              props: {
                title: query,
              }
            },
            " "
          ]);
        }
      }];
    }

    return filteredItems;
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
        <SuggestionMenuController
          triggerCharacter={"#"}
          // eslint-disable-next-line require-await
          getItems={async query =>
            filterTagItems(editor, query)
          }
        />
      </BlockNoteView>
    </div>
  );
};

export default Editor;