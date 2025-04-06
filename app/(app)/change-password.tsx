// app/(tabs)/change-password.modal.js
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import InputFormik from '../../components/InputFormik';
import useChangePasswordFormik from '../../hooks/useChangePasswordFormik';

export default function ChangePasswordModal() {
    const {
        values,
        loading,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm
    } = useChangePasswordFormik()
    const router = useRouter();
    const handleBack = () => {
        resetForm()
        router.back();
    }

    return (
        <View style={styles.modalContainer}>
            <Text variant="titleLarge">Cambiar contraseña</Text>
            <View style={styles.form}>
                <InputFormik
                    label="Nueva contraseña"
                    name="password"
                    value={values.password}
                    error={touched.password && !!errors.password}
                    errorText={errors.password}
                    handleChange={handleChange("password")}
                    handleBlur={handleBlur("password")}
                />

                <InputFormik
                    label="Repetir contraseña"
                    name="repeatPassword"
                    value={values.repeatPassword}
                    error={touched.repeatPassword && !!errors.repeatPassword}
                    errorText={errors.repeatPassword}
                    handleChange={handleChange("repeatPassword")}
                    handleBlur={handleBlur("repeatPassword")}
                />

            </View>
            <View style={styles.footerForm}>
                <Button
                    mode="outlined"
                    disabled={loading}
                    style={styles.button}
                    textColor="#0f0f0f"
                    onPress={handleBack}
                >
                    Cancelar
                </Button>
                <Button
                    mode="contained"
                    onPress={(e: any) => handleSubmit(e)}
                    loading={loading}
                    disabled={loading}
                    style={styles.button}
                    buttonColor="#0f0f0f"
                    textColor="white"
                >
                    Guardar
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        height: "100%",
        justifyContent: "center",
        padding: 20,
        gap: 40,
        marginBottom: 70,
        marginTop: 10,
    },
    form: {
        gap: 10
    },
    footerForm: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 2
    },
    button: {
        width: "48%",
        fontWeight: 900,
        borderRadius: 10,
    },
})