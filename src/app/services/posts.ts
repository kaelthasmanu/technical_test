import { fetchAllPosts, fetchPost, createPost, updatePost, deletePost } from "../repository/posts";
import { Post, CreatePostParams, UpdatePostParams } from "../types/server.interfaces";

/**
 * Retrieves all posts from the API
 * @returns Promise resolving to an array of posts
 * @throws Error if the request fails
 */
export async function getAllPosts(): Promise<Post[]> {
    try {
        return await fetchAllPosts();
    } catch (error) {
        console.error('Error fetching all posts:', error);
        const originalMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to retrieve posts: ${originalMessage}`);
    }
}

/**
 * Retrieves a single post by its ID
 * @param id - The ID of the post to retrieve
 * @returns Promise resolving to the post or null if not found
 * @throws Error if the request fails or ID is invalid
 */
export async function getPostById(id: number): Promise<Post | null> {
    if (!id || id <= 0) {
        throw new Error('Invalid post ID provided');
    }

    try {
        return await fetchPost(id);
    } catch (error) {
        console.error(`Error fetching post with ID ${id}:`, error);
        const originalMessage = error instanceof Error ? error.message : 'Unknown error';
        
        if (originalMessage.includes('Failed to fetch post')) {
            return null;
        }
        throw new Error(`Failed to retrieve post with ID ${id}: ${originalMessage}`);
    }
}

/**
 * Creates a new post
 * @param data - The post data to create (without ID)
 * @returns Promise resolving to the created post
 * @throws Error if the request fails or data is invalid
 */
export async function createNewPost(data: CreatePostParams): Promise<Post> {
    if (!data.title?.trim()) {
        throw new Error('Post title is required');
    }
    if (!data.body?.trim()) {
        throw new Error('Post body is required');
    }
    if (!data.userId || data.userId <= 0) {
        throw new Error('Valid user ID is required');
    }

    try {
        return await createPost(data);
    } catch (error) {
        console.error('Error creating post:', error);
        const originalMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to create post: ${originalMessage}`);
    }
}

/**
 * Updates an existing post
 * @param data - The post data to update (must include ID)
 * @returns Promise resolving to the updated post
 * @throws Error if the request fails or data is invalid
 */
export async function modifyPost(data: UpdatePostParams): Promise<Post> {
    if (!data.id || data.id <= 0) {
        throw new Error('Valid post ID is required for update');
    }

    const { id, ...updateFields } = data;
    if (Object.keys(updateFields).length === 0) {
        throw new Error('At least one field must be provided for update');
    }

    try {
        return await updatePost(data);
    } catch (error) {
        console.error(`Error updating post with ID ${data.id}:`, error);
        const originalMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to update post with ID ${data.id}: ${originalMessage}`);
    }
}

/**
 * Deletes a post by its ID
 * @param id - The ID of the post to delete
 * @returns Promise that resolves when the post is deleted
 * @throws Error if the request fails or ID is invalid
 */
export async function removePost(id: number): Promise<void> {
    if (!id || id <= 0) {
        throw new Error('Invalid post ID provided');
    }

    try {
        await deletePost(id);
    } catch (error) {
        console.error(`Error deleting post with ID ${id}:`, error);
        const originalMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to delete post with ID ${id}: ${originalMessage}`);
    }
}
