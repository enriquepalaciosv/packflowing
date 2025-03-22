import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, Title } from "react-native-paper";
import InputFormik from "../components/inputFormik";
import useRegisterFormik from "../hooks/useRegisterFormik";

export default function RegisterScreen() {
    const router = useRouter();
    const { values, loading, errors, handleChange, handleBlur, touched, handleSubmit } = useRegisterFormik();

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Registro de Usuario</Title>

            <View style={styles.form}>
                <InputFormik
                    label="Nombre"
                    name="name"
                    value={values.name}
                    error={touched.name && !!errors.name}
                    errorText={errors.name}
                    handleChange={handleChange("name")}
                    handleBlur={handleBlur("name")}
                />

                <InputFormik
                    label="Apellido"
                    name="lastName"
                    value={values.lastName}
                    error={touched.lastName && !!errors.lastName}
                    errorText={errors.lastName}
                    handleChange={handleChange("lastName")}
                    handleBlur={handleBlur("lastName")}
                />

                <InputFormik
                    label="Correo"
                    name="email"
                    value={values.email}
                    error={touched.email && !!errors.email}
                    errorText={errors.email}
                    handleChange={handleChange("email")}
                    handleBlur={handleBlur("email")}
                    keyboardType="email-address"
                />

                <InputFormik
                    label="Teléfono"
                    name="phone"
                    value={values.phone}
                    error={touched.phone && !!errors.phone}
                    errorText={errors.phone}
                    handleChange={handleChange("phone")}
                    handleBlur={handleBlur("phone")}
                    keyboardType="phone-pad"
                />

                <InputFormik
                    label="Contraseña"
                    name="password"
                    value={values.password}
                    error={touched.password && !!errors.password}
                    errorText={errors.password}
                    handleChange={handleChange("password")}
                    handleBlur={handleBlur("password")}
                    secureTextEntry
                />

                <Button
                    mode="contained"
                    onPress={(e: any) => handleSubmit(e)}
                    loading={loading}
                    disabled={loading}
                    style={styles.button}
                >
                    Registrarse
                </Button>

                <View style={styles.footer}>
                    <Text>Si ya tienes cuenta, ingresa </Text>
                    <Text
                        onPress={() => router.push("/sign-in")}
                        style={styles.footerLink}
                    >
                        aquí
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
    },
    title: {
        color: "#0f0f0f",
        fontWeight: 900,
        fontSize: 25,
        marginBottom: 30,
        textAlign: "center"
    },
    form: {
        paddingHorizontal: 10,
        gap: 5
    },
    button: {
        backgroundColor: "#0f0f0f",
        fontWeight: 900,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 10,
    },
    footer: { 
        flexDirection: "row", 
        marginTop: 15, 
        justifyContent: "center" 
    },
    footerLink: { 
        padding: 0, 
        margin: 0, 
        color: "0f0f0f", 
        fontWeight: 700 
    }
});
