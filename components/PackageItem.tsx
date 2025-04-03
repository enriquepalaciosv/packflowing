import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/colorsBgCard";
import ICONS from "../constants/iconsCard";
import { packageMapping } from "../utils/mappingText";

const Icon = ({ section, via, style, size }) => {
  const icon = ICONS(size, style)[section];
  return icon[via];
};

export default function PackageCard({ section, title, name, via }) {
  const props: { section?: string } = useLocalSearchParams();
  const sectionParams = props?.section;

  return (
    <View style={sectionParams ? [styles.card, { paddingHorizontal: 0 }] : styles.card}>
      <LinearGradient colors={COLORS[section]} style={styles.background} />
      {sectionParams ? <BodyPackageByStatus section={sectionParams} name={name} title={title} /> : <BodyPackageHomeScreen name={name} title={title} section={section} via={via} />}
      <Icon section={section} via={via} size={140} style={styles.bgIcon} />
    </View>
  );
};

const BodyPackageHomeScreen = ({ section, via, title, name }) => (
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
  </View>
);

const BodyPackageByStatus = ({ section, title, name }) => (
  <View style={styles.content}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{packageMapping[section]}</Text>
      <Text style={styles.packageCode}>Paquete: {title}</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 100,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  withoutPaddingHorizontal: { paddingHorizontal: 0 },
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
    marginLeft: 10,
  },
  title: {
    color: "white",
    fontWeight: 500,
    fontSize: 16,
    marginLeft: 10,
  },
  name: {
    color: "white",
    fontSize: 14,
    marginLeft: 10,
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
