import { Post, PostWithId } from "@/types";
import axios from "./axios";

export const GetPostRequest = async (): Promise<PostWithId[]> => {
  const res = await axios.get(`/posts`);
  const posts: PostWithId[] = res.data;
  return posts;
};

export const GetPostByIdRequest = async (id: number): Promise<PostWithId> => {
  const res = await axios.get(`/posts/${id}`);
  const post: PostWithId = res.data;
  return post;
}

export const AddPostRequest = async (post: Post):Promise<PostWithId> => {
  const res = await axios.post(`/posts`, post);
  const postCreated: PostWithId = res.data;
  return postCreated;
};

export const UpdatePostRequest = async (id: number, post: PostWithId):Promise<PostWithId> => {
  const res = await axios.put(`/posts/${id}`, {id, title: post.title, body: post.body, userId: post.userId});
  const postUpdate: PostWithId = res.data;
  return postUpdate;
};

export const DeletePostRequest = async (id: number):Promise<PostWithId> => {
  const res = await axios.delete(`/posts/${id}`);
  const post: PostWithId = res.data;
  return post;
};
