'use client'
import { usePostActions } from '@/lib/hooks/useProductAction';
import { GetPostRequest } from '@/lib/service/post';
import { PostWithId } from '@/types';
import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/modal';
import React, { useEffect, useState } from 'react'
import { NotificationIcon } from './icons';
import ModalAddPost from './ModalAddPopst';
import DrawerNotification from './DrawerNotification';
import TablePost from './TablePost';

function HomePage() {
    const { savePosts } = usePostActions();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenNotification,
    onOpen: onOpenNotification,
    onOpenChange: onOpenChangeNotification,
  } = useDisclosure();

  const [postEdit, setPostEdit] = useState<PostWithId | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await GetPostRequest();
      savePosts(posts);
    };
    fetchPosts();
  }, []);

  const editPost = (post: PostWithId | null) => {
    setPostEdit(post);
    onOpen();
  };
  return (
    <div className="flex flex-col gap-4 justify-end py-6 px-4 ">
      <div className="flex justify-between px-6">
        <h1 className="text-2xl font-bold ">Posts</h1>
        <div className="flex gap-4 justify-center items-center">
          <Button
            isIconOnly
            aria-label="more than 99 notifications"
            radius="full"
            color="primary"
            variant="ghost"
            onPress={onOpenNotification}
          >
            <NotificationIcon size={20} />
          </Button>
        </div>
      </div>
      <ModalAddPost
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        post={postEdit}
      />
      <DrawerNotification
        isOpen={isOpenNotification}
        onOpenChange={onOpenChangeNotification}
      />
      <TablePost editPost={editPost} />
    </div>
  )
}

export default HomePage