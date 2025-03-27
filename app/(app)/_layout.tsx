import { Platform, Text } from "react-native";
import { Redirect } from "expo-router";
import { useSession } from "../../contexts/authentication";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            height: "auto",
            paddingHorizontal: 75,
          },
          default: {
            height: "auto",
          },
        }),
        tabBarItemStyle: {
          width: 20,
          marginHorizontal: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Paquetes",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="package" color={color} />
          ),
          tabBarIconStyle: { marginBottom: 5 },
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="user" color={color} />
          ),
          tabBarIconStyle: { marginBottom: 5 },
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
    </Tabs>
  );
}
