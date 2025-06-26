
import { Notification, NotificationId, NotificationWithId } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: NotificationWithId[] = [];

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    saveAllNotifications: (state, action: PayloadAction<NotificationWithId[]>) => {
      return [...action.payload];
    },
    addNewNotification: (state, action: PayloadAction<Notification>) => {
      const id = crypto.randomUUID();
      state.push({ ...action.payload, id });
    },

    deleteNotificationById: (state, action: PayloadAction<NotificationId>) => {
      const id = action.payload;
      return state.filter((notification) => notification.id !== id);
    },
  },
});

export default notificationsSlice.reducer;

export const { addNewNotification, deleteNotificationById, saveAllNotifications } =
  notificationsSlice.actions;
