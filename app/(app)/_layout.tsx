import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { useSession } from "../../contexts/authentication";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import useFcmToken from "../../firebase/messaging";
import { useEffect } from "react";
import useNotificationListener from "../../hooks/useNotificationListener";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  useNotificationListener();

  useEffect(() => {
    const getToken = async () => {
      // Si hay una sesión activa
      // Obtengo el token y lo guardo en la ddbb
      if (!session?.token) {
        useFcmToken(session?.id);
      }
    };

    getToken();
  }, []);

  if (isLoading) return <Text>Loading...</Text>;
  if (!session) return <Redirect href="/sign-in" />;
  return (
    <PaperProvider theme={MD3LightTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "Inicio" }}
        />

        <Stack.Screen
          name="listAllPackages"
          options={{ headerShown: true, title: "" }}
        />

        <Stack.Screen
          name="detailPackage"
          options={{
            headerShown: true,
            title: "Detalles del Paquete",
            headerTintColor: "#0f0f0f",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
