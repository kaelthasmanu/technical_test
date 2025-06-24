import { fetchAllPosts, fetchPost, createPost, updatePost, deletePost } from "../repository/posts";
import { Post } from "../types/server.interfaces";

export async function getAllPosts(): Promise<Post[]> {
    return fetchAllPosts();
};

export async function getPostById(id: number): Promise<Post | null> {
    return fetchPost(id);
}

export async function createNewPost(data: Post): Promise<Post> {
    return createPost(data);
}

export async function modifyPost(data: Partial<Post>): Promise<Post> {
    return updatePost(data);
}

export async function removePost(id: number): Promise<void> {
    return deletePost(id);
}
