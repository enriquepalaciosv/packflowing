import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function RefreshAnimation({ children }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 75,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1250,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ position: "relative" }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {children}
      </Animated.View>

      <Animated.Text style={[styles.refreshText, { opacity }]}>
        Desliza para actualizar
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  refreshText: {
    textAlign: "center",
    position: "absolute",
    paddingTop: 25,
    width: "100%",
    top: 20,
    fontSize: 16,
    color: "#0f0f0f",
  },
});
