import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, Title } from "react-native-paper";
import InputFormik from "../components/InputFormik";
import useLoginFormik from "../hooks/useLoginFormik";
import useResetPasswordFormik from "../hooks/useResetPasswordFormik";

const LoginScreen = () => {
  const router = useRouter();
  const {
    values,
    errors,
    touched,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useResetPasswordFormik();
  return (
    <View style={styles.container}>
      <Image
        width={30}
        height={30}
        style={styles.logo}
        source={require("../assets/images/react-logo.png")}
      />

      <Title style={styles.title}>Recuperar contraseña</Title>

      <View style={styles.form}>
        <InputFormik
          label="Correo"
          name="email"
          value={values.email}
          error={touched.email && !!errors.email}
          errorText={errors.email}
          handleChange={handleChange("email")}
          handleBlur={handleBlur("email")}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Button
          mode="contained"
          onPress={(e: any) => handleSubmit(e)}
          loading={loading}
          disabled={loading}
          style={styles.button}
          buttonColor="#0f0f0f"
          textColor="white"
        >
          Enviar instrucciones
        </Button>

        <View style={styles.footer}>
          <Text>Volver a </Text>
          <Text
            onPress={() => router.push("/sign-in")}
            style={styles.footerLink}
          >
            iniciar sesión
          </Text>
        </View>
      </View>
    </View>
  );
};

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
    textAlign: "center",
    marginBottom: 15,
  },
  logo: {
    marginVertical: 5,
    marginHorizontal: "auto",
  },
  form: {
    paddingHorizontal: 10,
    gap: 10,
  },
  button: {
    fontWeight: 900,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  footerLink: {
    padding: 0,
    margin: 0,
    color: "0f0f0f",
    fontWeight: 700,
  },
});

export default LoginScreen;
