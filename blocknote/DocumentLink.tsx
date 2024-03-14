import { createReactInlineContentSpec } from "@blocknote/react";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

export const DocumentLink = createReactInlineContentSpec(
  {
    type: "documentLink",
    propSchema: {
      link: {
        default: "/documents",
      },
      title: {
        default: "untitled"
      }
    },
    content: "none"
  },
  {
    render: props => (
      <Link href={props.inlineContent.props.link}>
        <span className="inline-flex flex-row items-center underline underline-offset-2">
          <LinkIcon className="h-4 w-4" />
          {props.inlineContent.props.title}
        </span>
      </Link>
    )
  }
);