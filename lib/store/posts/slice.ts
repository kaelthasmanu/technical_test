import { Post, PostId, PostWithId } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: PostWithId[] = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    savePost: (state, action: PayloadAction<PostWithId[]>) => {
      return [...action.payload];
    },
    addNewPost: (state, action: PayloadAction<Post>) => {
      const id = state.length + 1;
      state.push({ ...action.payload, id });
    },
    updatePostById: (state, action: PayloadAction<PostWithId>) => {
      const { id, title, body, userId } = action.payload;
      return state.map((post) =>
        post.id === id ? { ...post, title, body, userId } : post
      );
    },
    deletePostById: (state, action: PayloadAction<PostId>) => {
      const id = action.payload;
      return state.filter((post) => post.id !== id);
    },
    rollbackPost: (state, action: PayloadAction<PostWithId>) => {
      const isPostAlreadyDefined = state.some(
        (post) => post.id === action.payload.id
      );
      if (!isPostAlreadyDefined) {
        state.push(action.payload);
      }
    },
    rollbackPostUpdate: (state, action: PayloadAction<PostWithId>) => {
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    },
    rollbackPostAdd: (state, action: PayloadAction<PostId>) => {
      return state.filter((post) => post.id !== action.payload);
    },
  },
});

export default postsSlice.reducer;

export const {
  addNewPost,
  deletePostById,
  savePost,
  rollbackPost,
  updatePostById,
  rollbackPostAdd,
  rollbackPostUpdate,
} = postsSlice.actions;
