import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

export default async function useFcmToken(id: string) {
  try {
    const token = await messaging().getToken();
    console.log("📱 FCM Token:", token);

    // console.log("Push token:", token);

    // Guardar token el firestore
    const doc = firestore().collection("users").doc(id);

    await doc.set({ token }, { merge: true });

    Alert.alert(token);
    return token;
  } catch (error) {
    console.error("Error getting push token:", error);
    return null;
  }
  // }, []);
}
