import * as Notifications from "expo-notifications";
import { doc, setDoc } from "firebase/firestore";
import { useCallback } from "react";
import { database } from "..";
import { messaging } from "react-native-firebase";

export default function useFcmToken(id: string) {
  return useCallback(async () => {
    try {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission not granted for push notifications!");
        return null;
      }

      // let token;

      // console.log("Using FCM Token");
      // const { data } = await Notifications.getDevicePushTokenAsync();
      // token = data;

      const token = await messaging().getToken();
      console.log("📱 FCM Token:", token);

      // console.log("Push token:", token);

      // Guardar token el firestore
      const userRef = doc(database, "users", id);
      await setDoc(userRef, { token }, { merge: true });

      return token;
    } catch (error) {
      console.error("Error getting push token:", error);
      return null;
    }
  }, []);
}
