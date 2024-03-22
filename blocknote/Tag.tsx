import "./blocknote.css";

import { createReactInlineContentSpec } from "@blocknote/react";

// "inline-flex flex-row items-center p-1 cursor-pointer text-xs
//                bg-white dark:bg-[#36393e] text-[#696969]
//                rounded-md border-[#696969] border-2"

export const Tag = createReactInlineContentSpec(
  {
    type: "tag",
    propSchema: {
      title: {
        default: "tag"
      },
    },
    content: "none"
  },
  {
    render: props => (
      <div className="tag">
        <span className="italic font-light">#</span>
        &nbsp;
        <span className="font-medium">{props.inlineContent.props.title}</span>
      </div>
    ),
  }
);