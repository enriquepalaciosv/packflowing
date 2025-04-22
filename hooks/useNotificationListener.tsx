import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export default function useNotificationListener() {
  const router = useRouter();

  const handleRedirect = (data: { screen?: string; id?: string }) => {
    if (data?.screen && data?.id) {
      router.push({
        pathname: `/(app)/detailPackage`,
        params: { id: data.id },
      });
    }
  };

  useEffect(() => {
    // App en foreground
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        const { notification, data } = remoteMessage;

        if (notification) {
          Alert.alert(notification.title || "", notification.body || "", [
            {
              text: "Ver",
              onPress: () => handleRedirect(data),
            },
            {
              text: "Cerrar",
              style: "cancel",
            },
          ]);
        }
      }
    );

    // App abierta desde background
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        if (remoteMessage?.data) {
          handleRedirect(remoteMessage.data);
        }
      }
    );

    // App abierta desde cerrada (estado killed)
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage?.data) {
          handleRedirect(remoteMessage.data);
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };
  }, []);
}
