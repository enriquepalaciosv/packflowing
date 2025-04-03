import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { useSession } from "../../contexts/authentication";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) return <Text>Loading...</Text>;
  if (!session) return <Redirect href="/sign-in" />;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "Inicio" }}
      />

      <Stack.Screen
        name="listAllPackages"
        options={{ headerShown: true, title: "" }}
      />
    </Stack>
  );
}
