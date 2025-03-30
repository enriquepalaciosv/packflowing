import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function HeaderPackages({
  name,
  lockerCode,
}: {
  name;
  lockerCode: string;
}) {
  return (
    <View style={styles.stickyHeaderContainer}>
      <Text variant="headlineMedium">¡Hola, {name}!</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
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
    </View>
  );
}

const styles = StyleSheet.create({
  stickyHeaderContainer: {
    position: "sticky",
    minHeight: 120,
    padding: 15,
    top: 0,
    left: 0,
    right: 0,
  },
});
