import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

const LoginScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        onPress={() => router.push("/register")}
        style={styles.button}
      >
        Registrarse
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  button: {
    borderRadius: 10,
    marginTop: 10,
  },
});

export default LoginScreen;
