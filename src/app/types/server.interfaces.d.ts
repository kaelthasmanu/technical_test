export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
} 

export interface CreatePostParams extends Omit<Post, 'id'> {}

export interface UpdatePostParams extends Partial<Post> {
    id: number;
}