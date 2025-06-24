import { query } from "./config.axios";

export async function fetchPosts(): Promise<any[]> {
    const response = await query.get('/posts');
    if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to fetch posts');
    }
    return response.data;
}

export async function fetchPost(): Promise<any> {
    const response = await query.get('/posts/1');
    if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to fetch post');
    }
    return response.data;
}