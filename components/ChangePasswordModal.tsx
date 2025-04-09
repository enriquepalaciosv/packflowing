import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import InputFormik from '../components/InputFormik';
import useChangePasswordFormik from '../hooks/useChangePasswordFormik';

export default function ChangePasswordModal({ visible, hideModal }: { visible: boolean, hideModal: () => void }) {
    const {
        values,
        loading,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm
    } = useChangePasswordFormik(hideModal);
    const handleBack = () => {
        resetForm();
        hideModal();
    }
    const submit = () => handleSubmit();

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.container}
            >
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
                        secureTextEntry
                    />

                    <InputFormik
                        label="Repetir contraseña"
                        name="repeatPassword"
                        value={values.repeatPassword}
                        error={touched.repeatPassword && !!errors.repeatPassword}
                        errorText={errors.repeatPassword}
                        handleChange={handleChange("repeatPassword")}
                        handleBlur={handleBlur("repeatPassword")}
                        secureTextEntry
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
                        onPress={submit}
                        loading={loading}
                        disabled={loading}
                        style={styles.button}
                        buttonColor="#0f0f0f"
                        textColor="white"
                    >
                        Guardar
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "75%",
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        justifyContent: "flex-start",
        gap: 25
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