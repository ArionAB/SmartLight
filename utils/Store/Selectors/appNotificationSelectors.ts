import { AppNotificationModel } from "../Models/appNotification/AppNotificationModel";
import { RootState } from "../store";

export const selectAppNotifications = (
    state: RootState
): AppNotificationModel[] => state.notification.notifications;
