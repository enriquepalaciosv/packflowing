import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { useSession } from "../../contexts/authentication";
import { PaperProvider } from 'react-native-paper';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) return <Text>Loading...</Text>;
  if (!session) return <Redirect href="/sign-in" />;
  return (
    <PaperProvider>
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
