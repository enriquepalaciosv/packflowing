import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, View } from "react-native";
import ToastManager from 'toastify-react-native';
import { SessionProvider } from '../contexts/authentication';
import { useSplashAnimation } from '../hooks/useSplashAnimation';

export default function Root() {
  const { opacity, isReady } = useSplashAnimation();

  if (!isReady) {
    return (
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}>
        <Animated.Image
          source={require("../assets/icon.png")}
          style={{
            opacity,
            width: 200,
            height: 200,
            resizeMode: "contain",
          }}
        />
      </View>
    );
  }

  return (
    <SessionProvider>
      <ToastManager
        position='bottom'
        textStyle={{
          fontSize: 14,
          color: "#fff"
        }}
        style={{
          width: "100%",
          backgroundColor: "#222",
          borderRadius: 8,
          shadowColor: "#000",
        }}
      />
      <Slot />
    </SessionProvider>
  );
}
