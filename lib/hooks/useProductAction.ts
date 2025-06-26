import { Post, PostId, PostWithId } from "@/types";
import { addNewPost, deletePostById, savePost, updatePostById } from "../store/posts/slice";
import { useAppDispatch } from "./store";

export const usePostActions = () => {
	const dispatch = useAppDispatch();

    const savePosts = (post: PostWithId[]) => {
        dispatch(savePost(post));
    };

	const addPost = ({ title, body, userId }: Post) => {
		dispatch(addNewPost({ title, body, userId }))
	}

    const updatePost = ({ id, title, body, userId }: PostWithId) => {
        dispatch(updatePostById({ id, title, body, userId }))
    }

	const removePost = (id: PostId) => {
		dispatch(deletePostById(id));
	};

	
	return { addPost, removePost, savePosts, updatePost };
};