import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Platform, Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      title="Hols"
      name="index"
      options={{ headerShown: true, title: "Inicio" }}
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
