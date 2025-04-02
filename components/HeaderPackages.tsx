  import { StyleSheet, View, Platform } from "react-native";
import { Text } from "react-native-paper";

export default function HeaderPackages({
  name,
  lockerCode,
}: {
  name;
  lockerCode: string;
}) {
  return (
    <View style={Platform.OS === "android" ? [styles.stickyHeaderContainer, styles.paddingAndroid] : styles.stickyHeaderContainer}>
      <Text variant="headlineMedium">¡Hola, {name}!</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >        
        <Text
          variant="titleLarge"
          style={{ marginLeft: 5, fontWeight: 600, color: "#1f4396" }}
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
    minHeight: Platform.OS === "ios" ? 100 : 150,
    height: "auto",
    padding: 15,
    top: 0,
    left: 0,
    right: 0,
  },
  paddingAndroid: {
    paddingTop: 50
  }
});
