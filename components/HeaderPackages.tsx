import { View } from "react-native";
import { Text } from "react-native-paper";

export default function HeaderPackages({
  name,
  lockerCode,
}: {
  name;
  lockerCode: string;
}) {
  return (
    <>
      <Text variant="headlineMedium">¡Hola, {name}!</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          marginVertical: 10,
        }}
      >
        <Text variant="titleMedium" style={{ fontWeight: 400 }}>
          Casillero:
        </Text>
        <Text
          variant="titleLarge"
          style={{ marginLeft: 5, fontWeight: 600, color: "#ff8a00" }}
        >
          {String(lockerCode)}
        </Text>
      </View>
    </>
  );
}
