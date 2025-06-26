import React from "react";
import {
  BoldIcon,
  ItalicIcon,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  UnderlineIcon,
  Undo,
} from "./icons";
import { Editor } from "@tiptap/react";
import { Button } from "@heroui/button";

interface ToolBarRichTextProps {
  editor: Editor | null;
}

function ToolBarRichText({ editor }: ToolBarRichTextProps) {
  if (!editor) {
    return null;
  }

  
  return (
    <div className="border-b border-neutral-800 p-3 bg-neutral-700">
      <div className="flex flex-wrap gap-1">
        <Button
          onPress={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-all duration-200 ${
            editor.isActive("bold")
              ? " text-blue-600 shadow-sm"
              : "text-white hover:bg-neutral-400 hover:text-black"
          }`}
          title="Bold"
          isIconOnly
          radius="full"
          color="default"
          variant="ghost"
        >
          <BoldIcon className="w-4 h-4" />
        </Button>

        <Button
          onPress={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-all duration-200 ${
            editor.isActive("italic")
              ? "text-blue-600 shadow-sm"
              : "text-white hover:bg-neutral-400 hover:text-black"
          }`}
          title="Italic"
          isIconOnly
          radius="full"
          color="default"
          variant="ghost"
        >
          <ItalicIcon className="w-4 h-4" />
        </Button>

        <Button
          onPress={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-lg transition-all duration-200 ${
            editor.isActive("underline")
              ? "text-blue-600 shadow-sm"
              : "text-white hover:bg-neutral-400 hover:text-black"
          }`}
          title="Underline"
          isIconOnly
          radius="full"
          color="default"
          variant="ghost"
        >
          <UnderlineIcon className="w-4 h-4" />
        </Button>

        <Button
          onPress={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-lg transition-all duration-200 ${
            editor.isActive("strike")
              ? "text-blue-600 shadow-sm"
              : "text-white hover:bg-neutral-400 hover:text-black"
          }`}
          title="Strikethrough"
          isIconOnly
          radius="full"
          color="default"
          variant="ghost"
        >
          <Strikethrough className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-neutral-900 mx-1 self-center" />

        <Button
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-all duration-200 ${
            editor.isActive("bulletList")
              ? "text-blue-600 shadow-sm"
              : "text-white hover:bg-neutral-400 hover:text-black"
          }`}
          title="Bullet List"
          isIconOnly
          radius="full"
          color="default"
          variant="ghost"
        >
          <List className="w-4 h-4" />
        </Button>

        <Button
          onPress={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-all duration-200 ${
            editor.isActive("orderedList")
              ? "text-blue-600 shadow-sm"
              : "text-white hover:bg-neutral-400 hover:text-black"
          }`}
          title="Numbered List"
          isIconOnly
          radius="full"
          color="default"
          variant="ghost"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-neutral-900 mx-1 self-center" />

        <Button
          onPress={() => editor.chain().focus().undo().run()}
          title="Undo"
          isIconOnly
          radius="full"
          color="default"
          variant="ghost"
        >
          <Undo className="w-4 h-4" />
        </Button>

        <Button
          onPress={() => editor.chain().focus().redo().run()}
          title="Redo"
          isIconOnly
          radius="full"
          color="default"
          variant="ghost"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default ToolBarRichText;
