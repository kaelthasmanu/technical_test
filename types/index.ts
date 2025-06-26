import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type PostId = number;

export type NotificationId = string;

export interface Post {
  title: string;
  body: string;
  userId: number;
}

export interface PostWithId extends Post {
  id: PostId;
}

export interface Notification {
  type: "success" | "default" | "primary" | "secondary" | "warning" | "danger";
  message: string;
}

export interface NotificationWithId extends Notification {
  id: NotificationId;
}

export interface ModalAddPostProps {
  post: PostWithId | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface PostForm extends Omit<PostWithId, "id" | "userId"> {}

export interface DrawerNotificationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface ModalViewPostProps {
  content: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}
