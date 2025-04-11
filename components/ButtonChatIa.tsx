import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import ChatIaModal from "./ChatIaModal";
import { getAgenciaByDefault } from "../firebase/agencia/services";

export default function ButtonChatIa() {
    const [visible, setVisible] = useState(false);
    const [ai, setAI] = useState(null);
    const handleModal = () => setVisible(!visible);

    useEffect(() => {
        getAgenciaByDefault()
            .then((response: { AI: boolean }) => setAI(response.AI))
            .catch(error => console.log({ error }))
    }, [])


    if(ai === null) return null;

    return (
        <>
            <ChatIaModal visible={visible} hideModal={handleModal} />
            <TouchableOpacity style={styles.container} onPress={handleModal}>
                <Feather size={28} name="help-circle" color={"#8f8f8f"} />
                <Text variant="labelMedium" style={{ color: "#8f8f8f" }}>Buscar</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: "50%",
        bottom: 0,
        transform: [{ translateX: 30 }],
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: 60,
        paddingTop: 5,
        gap: 2
    },
});