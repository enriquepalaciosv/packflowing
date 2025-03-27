import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/colorsBgCard";
import ICONS from "../constants/iconsCard";

const Icon = ({ section, via, style, size }) => {
  const icon = ICONS(size, style)[section];
  return icon[via];
};

export default function PackageCard({ section, title, name, via }) {
  return (
    <View style={styles.card}>
      <LinearGradient colors={COLORS[section]} style={styles.background} />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon
            section={section}
            via={via}
            size={30}
            style={styles.iconContainer}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.packageCode}>{title}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <AntDesign
          name="arrowright"
          style={styles.arrow}
          size={24}
          color="white"
        />
      </View>
      <Icon section={section} via={via} size={140} style={styles.bgIcon} />
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
  iconContainer: {
    width: 30,
    height: 30,
  },
  textContainer: {
    flex: 1,
    gap: 5,
    marginLeft: 10,
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
