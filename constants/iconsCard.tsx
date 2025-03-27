import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { StyleProp } from "react-native";

const ICONS = (size: number, style: StyleProp<any>) => {
  return {
    "Paquetes entregados": {
      aereo: (
        <Feather name="check-circle" size={size} style={style} color="white" />
      ),
      maritimo: (
        <Feather name="check-circle" size={size} style={style} color="white" />
      ),
    },
    "Paquetes listos para recoger": {
      aereo: <Feather name="package" size={size} style={style} color="white" />,
      maritimo: (
        <Feather name="package" size={size} style={style} color="white" />
      ),
    },
    "Paquetes en tránsito": {
      aereo: (
        <Ionicons
          name="airplane"
          size={size}
          color="white"
          style={[style, { transform: [{ rotate: "-90deg" }] }]}
        />
      ),
      maritimo: (
        <FontAwesome6 name="ship" size={size - 4} color="white" style={style} />
      ),
    },
    "Paquetes recibidos": {
      aereo: (
        <Ionicons
          name="airplane"
          size={size}
          color="white"
          style={[style, { transform: [{ rotate: "-90deg" }] }]}
        />
      ),
      maritimo: (
        <FontAwesome6 name="ship" size={size - 4} color="white" style={style} />
      ),
    },
  };
};

export default ICONS;
