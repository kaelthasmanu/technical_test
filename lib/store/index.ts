import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { addToast } from "@heroui/toast";
import postReducer from "./posts/slice";
import notificationsReducer from "./notifications/slice";
import {
  AddPostRequest,
  DeletePostRequest,
  UpdatePostRequest,
} from "../service/post";
import {
  rollbackPost,
  rollbackPostAdd,
  rollbackPostUpdate,
} from "./posts/slice";
import { addNewNotification } from "./notifications/slice";

const persistanceDateMiddleware: Middleware = (store) => (next) => (action) => {
  next(action);
  const state = store.getState() as RootState;
  localStorage.setItem("__redux__state__", JSON.stringify(state.notifications));
};

const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type, payload } = action as { type: string; payload: any };
    const previousState = store.getState() as RootState;
    next(action);

    if (type === "posts/deletePostById") {
      const postIdToRemove = payload;

      const postToRemove = previousState.post.find(
        (post) => post.id === postIdToRemove
      );

      DeletePostRequest(postIdToRemove)
        .then(() => {
          addToast({
            title: "Item Delete",
            description: "Item Delete successfully",
            color: "success",
          });
          store.dispatch(
            addNewNotification({
              type: "success",
              message: "Post deleted successfully",
            })
          );
        })
        .catch(() => {
          if (!postToRemove) return;
          store.dispatch(rollbackPost(postToRemove));
          addToast({
            title: "Error",
            description: "Item Delete failed",
            color: "danger",
          });
          store.dispatch(
            addNewNotification({
              type: "danger",
              message: "Post deleted successfully",
            })
          );
        });
    }

    if (type === "posts/addNewPost") {
      const postToAdd = payload;

      const state = store.getState() as RootState;

      const postToRollback = state.post.find(
        (post) => post.id !== postToAdd.id
      );

      AddPostRequest(postToAdd)
        .then((res) => {
          console.log(res)
          addToast({
            title: "Item Add",
            description: "Item Add successfully",
            color: "success",
          });
          store.dispatch(
            addNewNotification({
              type: "success",
              message: "Post added successfully",
            })
          );
        })
        .catch(() => {
          if (!postToRollback) return;
          store.dispatch(rollbackPostAdd(postToRollback.id));
          addToast({
            title: "Item Add",
            description: "Item Add failed",
            color: "danger",
          });
          store.dispatch(
            addNewNotification({
              type: "danger",
              message: "Post added successfully",
            })
          );
        });
    }

    if (type === "posts/updatePostById") {
      const postToUpdate = payload;

      const postToRollback = previousState.post.find(
        (post) => post.id === postToUpdate.id
      );

      UpdatePostRequest(postToUpdate.id, postToUpdate)
        .then(() => {
          addToast({
            title: "Item Update",
            description: "Item Update successfully",
            color: "success",
          });
          store.dispatch(
            addNewNotification({
              type: "success",
              message: "Post updated successfully",
            })
          );
        })
        .catch(() => {
          if (!postToRollback) return;
          store.dispatch(rollbackPostUpdate(postToRollback));
          addToast({
            title: "Item Update",
            description: "Item Update failed",
            color: "danger",
          });
          store.dispatch(
            addNewNotification({
              type: "danger",
              message: "Post updated successfully",
            })
          );
        });
    }
  };

export const store = configureStore({
  reducer: {
    post: postReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      persistanceDateMiddleware,
      syncWithDatabaseMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
