import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
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
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      if (notification?.request?.content?.data) {
        handleRedirect(notification.request.content.data);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

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

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };
  }, []);
}
