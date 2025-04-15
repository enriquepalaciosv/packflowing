import * as Notifications from "expo-notifications";
import { doc, setDoc } from "firebase/firestore";
import { useCallback } from "react";
import { database } from "..";
import messaging from "@react-native-firebase/messaging";
import firebase from "@react-native-firebase/app";

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

      if (firebase.apps.length === 0) {
        firebase.initializeApp({
          apiKey: process.env.EXPO_PUBLIC_API_KEY,
          authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
          projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
          storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
          messagingSenderId: process.env.EXPO_PUBLIC_MESSASING_SENDER_ID,
          appId: process.env.EXPO_PUBLIC_APP_ID,
          measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
        });
      }

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
