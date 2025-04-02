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
            height: 85,
            paddingHorizontal: 75,
            paddingTop: 10,
          },
          default: {
            paddingTop: 5,
            height: 70,
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
          tabBarIcon: ({ focused }) => (
            <Feather size={28} name="package" color={focused ? "#1f4396" : "grey"} />
          ),
          tabBarIconStyle: { marginBottom: 5 },
          tabBarLabel(props) {
            return (
              <Text
                {...props}
                style={{
                  fontSize: 12,
                  color: props.focused ? "#1f4396" : "grey",
                }}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <Feather size={28} name="user" color={focused ? "#1f4396" : "grey"} />
          ),
          tabBarIconStyle: { marginBottom: 5 },
          tabBarLabel(props) {
            return (
              <Text
                {...props}
                style={{
                  fontSize: 12,
                  color: props.focused ? "#1f4396" : "grey",
                }}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
