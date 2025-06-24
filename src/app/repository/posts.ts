import { Post, CreatePostParams } from "../types/server.interfaces";
import { query } from "./config.axios";

export async function fetchAllPosts(): Promise<Post[]> {
    const response = await query.get('/posts');
    if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to fetch posts');
    }
    return response.data;
}

export async function fetchPost(): Promise<Post> {
    const response = await query.get('/posts/1');
    if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to fetch post');
    }
    return response.data;
}

export async function createPost(post: CreatePostParams): Promise<Post> {
    const response = await query.post('/posts', post);
    if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to create post');
    }
    return response.data;
}

export async function updatePost(post: Partial<Post>): Promise<Post> {
    const response = await query.patch(`/posts/${post.id}`, post);
    if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to patch post');
    }
    return response.data;
}

export async function deletePost(id: number): Promise<void> {
    const response = await query.delete(`/posts/${id}`);
    if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to delete post');
    }
}