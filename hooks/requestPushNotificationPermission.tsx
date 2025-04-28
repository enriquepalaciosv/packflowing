import * as Notifications from "expo-notifications";

export async function requestPushNotificationPermission() {
  const settings = await Notifications.getPermissionsAsync();

  if (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  ) {
    return true;
  }

  const { status } = await Notifications.requestPermissionsAsync();

  return status === "granted";
}
