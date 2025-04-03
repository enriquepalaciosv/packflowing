import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, Text } from "react-native";

export default function TabsLayout() {
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
          android: {
            position: "absolute",
            height: 60,
            paddingBottom: 10,
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
          tabBarIcon: ({ focused }) => (
            <Feather size={28} name="package" color={focused ? "#1f4396" : "grey"} />
          ),
          tabBarIconStyle: { marginBottom: 5 },
          tabBarLabelStyle: { fontSize: 12 },
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
