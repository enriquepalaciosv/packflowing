import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";

const Icon = ({ style, size, section, via }) =>
  section === "Paquetes entregados" ? (
    <Feather name="check-circle" size={size} color="white" style={style} />
  ) : section === "Paquetes listos para recoger" ? (
    <Feather name="package" size={size} color="white" style={style} />
  ) : section === "Paquetes en tránsito" && via === "air" ? (
    <Ionicons
      name="airplane"
      style={[
        style,
        {
          transform: [{ rotate: "-90deg" }],
        },
      ]}
      size={size}
      color="white"
    />
  ) : section === "Paquetes en tránsito" && via === "sea" ? (
    <FontAwesome6 name="ship" style={style} size={size} color="white" />
  ) : section === "Paquetes recibidos" && via === "air" ? (
    <Ionicons
      name="airplane"
      style={[
        style,
        {
          transform: [{ rotate: "-90deg" }],
        },
      ]}
      size={size}
      color="white"
    />
  ) : (
    <FontAwesome6 name="ship" style={style} size={size} color="white" />
  );

export default function PackageCard({ section, title, name, via }) {
  const colors =
    section === "Paquetes recibidos"
      ? ["#0072FF", "#00C6FF"]
      : section === "Paquetes en tránsito"
      ? ["#F7B733", "#FC4A1A"]
      : section === "Paquetes listos para recoger"
      ? ["#56ab2f", "#a8e063"]
      : ["#F7971E", "#FFD200"];

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={colors as [string, string]}
        style={styles.background}
      />
      <View style={styles.content}>
        <Icon style={styles.icon} size={30} section={section} via={via} />

        {/* Código del paquete */}
        <View style={{ flex: 1, gap: 5, marginLeft: 10 }}>
          <Text style={styles.packageCode}>{title}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>

        {/* Flecha */}
        <AntDesign
          name="arrowright"
          style={styles.arrow}
          size={24}
          color="white"
        />
      </View>

      {/* Ícono de fondo (SVG con opacidad) */}
      <Icon style={styles.bgIcon} size={140} section={section} via={via} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 20,
    height: 100,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    width: 30,
    height: 30,
  },
  packageCode: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  name: {
    color: "white",
    fontSize: 14,
  },
  arrow: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  bgIcon: {
    position: "absolute",
    right: 0,
    bottom: -50,
    opacity: 0.25,
  },
});
