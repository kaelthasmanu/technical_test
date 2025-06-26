"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import ToolBarRichText from "./ToolBarRichText";
import { RichTextEditorProps } from "@/types";

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = "Start writing...",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Bold,
      Italic,
      Strike,
      Underline,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-6",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-6",
        },
      }),
      ListItem,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  return (
    <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-800 shadow-sm">
      <ToolBarRichText editor={editor} />

      <div className="min-h-[200px]">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  );
};

export default RichTextEditor;
