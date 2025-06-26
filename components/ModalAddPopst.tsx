"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useForm } from "react-hook-form";
import { usePostActions } from "@/lib/hooks/useProductAction";
import { ModalAddPostProps, PostForm } from "@/types";
import RichTextEditor from "./RichTextEditor";



function ModalAddPost({ isOpen, onOpenChange, post }: ModalAddPostProps) {
  const { addPost, updatePost } = usePostActions();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostForm>({
    defaultValues: {
      title: post?.title || "",
      body: post?.body || "",
    },
    values: {
      title: post?.title || "",
      body: post?.body || "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!post) {
      addPost({ title: data.title, body: data.body, userId: 1 });
    } else {
      updatePost({
        id: post.id,
        title: data.title,
        body: data.body,
        userId: post.userId,
      });
    }
    reset();
    onOpenChange(false);
  });

  const editorContent = watch("body");

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      size="3xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                {post ? "Update Post" : "Add Post"}
              </ModalHeader>
              <ModalBody>
                {errors.title && (
                  <p className="text-danger">{errors.title.message}</p>
                )}
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters long",
                    },
                  })}
                />

                <RichTextEditor
                  content={editorContent}
                  onChange={(content) => setValue("body", content)}
                  placeholder="Write your rich text content here..."
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary">
                  {post ? "Update Post" : "Add Post"}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalAddPost;
