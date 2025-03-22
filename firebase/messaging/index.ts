import { getMessaging, getToken, onMessage } from "firebase/messaging";
import app from "..";
import Constants from "expo-constants";

const messaging = getMessaging(app);

export const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        const fcmToken = await getToken(messaging, {
            vapidKey: Constants.expoConfig.extra.vapidKey,
        });
        console.log("FCM Token:", fcmToken);
    } else {
        console.log("Permiso denegado para notificaciones");
    }
};


export default messaging;
