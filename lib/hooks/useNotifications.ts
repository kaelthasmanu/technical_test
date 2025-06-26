import { NotificationId, Notification, NotificationWithId } from "@/types";
import { useAppDispatch, useAppSelector } from "./store";
import {
  addNewNotification,
  deleteNotificationById,
  saveAllNotifications,
} from "../store/notifications/slice";
import { useEffect } from "react";

function useNotifications() {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector((state) => state.notifications);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = localStorage.getItem("__redux__state__");
      if (!notifications) return;
      dispatch(saveAllNotifications(JSON.parse(notifications)))
    };
    fetchNotifications();
  }, []);

  const saveNotifications = (notifications: NotificationWithId[]) => {
    dispatch(saveAllNotifications(notifications));
  };

  const removeNotification = (id: NotificationId) => {
    dispatch(deleteNotificationById(id));
  };

  return { removeNotification, saveNotifications, notifications };
}

export default useNotifications;
