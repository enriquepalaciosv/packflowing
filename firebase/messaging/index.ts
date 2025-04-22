import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";

export default async function useFcmToken(id: string) {
  try {
    const token = await messaging().getToken();

    if (id) {
      // Guardar token el firestore
      const doc = firestore().collection("users").doc(id);

      await doc.set({ token }, { merge: true });

      return token;
    }
  } catch (error) {
    console.error("Error getting push token:", error);
    return null;
  }
}
