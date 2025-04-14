import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, Text, View } from "react-native";
import ButtonChatIa from "../../../components/ButtonChatIa";
import { useEffect, useState } from "react";
import { getAgenciaByDefault } from "../../../firebase/agencia/services";

export default function TabsLayout() {
  const [ai, setAI] = useState(null);
  const [activo, setActivo] = useState(null);

  useEffect(() => {
    getAgenciaByDefault()
      .then((response: { AI: boolean; activo: boolean }) => {
        setAI(response.AI);
        setActivo(response.activo);
      })
      .catch((error) => console.log({ error }));
  }, []);

  if (ai === null) return null;

  if (!activo)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Servicio no disponible por el momento</Text>
      </View>
    );

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              height: 60,
            },
            android: {
              position: "absolute",
              height: 60,
              paddingBottom: 10,
            },
            default: {
              height: 60,
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
            tabBarLabelStyle: { fontSize: 12, fontWeight: 500 },
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
      {ai && <ButtonChatIa />}
    </>
  );
}
