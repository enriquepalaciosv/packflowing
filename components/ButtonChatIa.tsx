import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import ChatIaModal from "./ChatIaModal";
import { getAgenciaByDefault } from "../firebase/agencia/services";

export default function ButtonChatIa() {
  const [visible, setVisible] = useState(false);
  const [ai, setAI] = useState(null);
  const handleModal = () => setVisible(!visible);

  useEffect(() => {
    getAgenciaByDefault()
      .then((response: { AI: boolean }) => setAI(response.AI))
      .catch((error) => console.log({ error }));
  }, []);

  if (ai === null) return null;

  return (
    <>
      <ChatIaModal visible={visible} hideModal={handleModal} />
      <TouchableOpacity style={styles.container} onPress={handleModal}>
        <Feather size={28} name="help-circle" color={"#8E8E8F"} />
        <Text
          allowFontScaling={false}
          style={{ color: "#8E8E8F", fontSize: 12, fontWeight: 500 }}
        >
          Buscar
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 60 / 2 - 30,
    left: "50%",
    transform: [{ translateX: -30 }],
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    gap: 4,
  },
});
