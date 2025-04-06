import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Divider, Icon, Text } from "react-native-paper";
import InputFormik from "../../../components/InputFormik";
import SelectCountryCodes from "../../../components/SelectCountryCodes";
import { useSession } from "../../../contexts/authentication";
import useProfileFormik from "../../../hooks/useProfileFormik";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Linking } from 'react-native';

export default function Profile() {
  const { signOut, session } = useSession();
  const {
    values,
    loading,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    resetForm
  } = useProfileFormik(session);

  const handleContact = () => {
    const phoneNumber = process.env.EXPO_PUBLIC_NUMBER_CONTACT;
    const url = `https://wa.me/${phoneNumber}`;
    Linking.openURL(url);
  };
  const handlePolity = () => Linking.openURL(process.env.EXPO_PUBLIC_POLITY_URL);
  const handleSignOut = () => signOut();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text variant="titleLarge">Información personal</Text>
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
              autoCapitalize="none"
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 5
              }}
            >
              <SelectCountryCodes
                label={"Cód."}
                name={"countryCode"}
                value={values.countryCode}
                error={touched.countryCode && !!errors.countryCode}
                errorText={errors.countryCode}
                setFieldValue={setFieldValue}
                handleBlur={handleBlur("countryCode")}
                keyboardType="phone-pad"
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
                style={{ width: "70%" }}
              />
            </View>
          </View>
          <View style={styles.footerForm}>
            <Button
              mode="outlined"
              onPress={() => resetForm()}
              disabled={loading}
              style={styles.button}
              textColor="#0f0f0f"
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

          {/* Seguridad */}
          <Text variant="titleLarge">Seguridad</Text>
          <View style={styles.security}>
            <TouchableOpacity style={styles.buttonSecurity}>
              <Icon size={20} source="lock" />
              <Text style={styles.textSecurity}>Cambiar contraseña</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity onPress={handleContact} style={styles.buttonSecurity}>
              <Icon size={20} source="phone-outgoing" />
              <Text style={styles.textSecurity}>Contacto</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity onPress={handlePolity} style={styles.buttonSecurity}>
              <MaterialCommunityIcons name="shield-alert-outline" size={20} color="black" />
              <Text style={styles.textSecurity}>Politícas de privacidad</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.security}>
            <TouchableOpacity onPress={handleSignOut} style={styles.buttonSecurity}>
              <Icon size={20} source="logout-variant" />
              <Text style={styles.textSecurity}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    marginBottom: 70,
    marginTop: 10
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
  security: {
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 15
  },
  buttonSecurity: {
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    gap: 10
  },
  textSecurity: {
    fontSize: 16
  }
})