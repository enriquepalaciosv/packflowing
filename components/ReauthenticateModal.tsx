import React, { useState } from "react";
import { Modal, View, Text, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native-paper";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useSession } from "../contexts/authentication";

interface Props {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void; // callback si la reautenticación fue exitosa
}

export default function ReauthenticateModal({ visible, onClose, onSuccess }: Props) {
    const { signIn } = useSession();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReauth = async () => {
        setLoading(true);
        setError("");

        const auth = getAuth();
        const user = auth.currentUser;
        console.log({ user })
        if (!user || !user.email) {
            setError("Usuario no autenticado.");
            setLoading(false);
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);

            setPassword("");
            onSuccess();
        } catch (err: any) {
            setError("Contraseña incorrecta.");
            console.error("Error en reautenticación:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Reautenticación requerida</Text>
                    <Text style={styles.description}>Ingresa tu contraseña para continuar.</Text>

                    <TextInput
                        placeholder="Contraseña"
                        secureTextEntry
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />

                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <View style={styles.actions}>
                        <Button
                            mode="outlined"
                            onPress={onClose}
                            disabled={loading}
                            style={styles.button}
                            textColor="#0f0f0f"
                        >
                            Cancelar
                        </Button>
                        <Button
                            mode="contained"
                            onPress={handleReauth}
                            loading={loading}
                            disabled={loading}
                            style={styles.button}
                            buttonColor="#0f0f0f"
                            textColor="white"
                        >
                            Guardar
                        </Button>
                    </View>

                    {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "#00000088",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        gap: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        marginBottom: 10,
        color: "#444",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 6,
        marginBottom: 10,
    },
    error: {
        color: "red",
        marginBottom: 8,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        width: "48%",
        fontWeight: 900,
        borderRadius: 10,
    },
});