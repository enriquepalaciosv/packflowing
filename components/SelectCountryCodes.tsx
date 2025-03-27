import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  CountryButton,
  CountryPicker,
} from "react-native-country-codes-picker";
import { TextInput } from "react-native-paper";

interface InputFormikProps {
  name: string;
  label: string;
  value: string;
  error: boolean;
  errorText: string;
  setFieldValue: (field: string, value: any) => void;
  handleBlur: (text: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
}

function ListHeaderComponent({ countries, lang, onPress }) {
  return (
    <View style={{ paddingBottom: 20 }}>
      <Text style={{ marginVertical: 10 }}>Populares</Text>
      {countries?.map((country, index) => (
        <CountryButton
          key={index}
          item={country}
          name={country?.name?.[lang || "en"]}
          onPress={() => onPress(country)}
          style={{ countryButtonStyles: styles.countryButtonStyles }}
        />
      ))}
    </View>
  );
}

export default function SelectCountryCodes({
  name,
  label,
  value,
  error,
  errorText,
  setFieldValue,
  handleBlur,
  keyboardType = "default",
  secureTextEntry = false,
}: InputFormikProps) {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 50,
          zIndex: 5,
        }}
      />
      <TextInput
        label={label}
        value={value}
        mode="outlined"
        onBlur={handleBlur}
        editable={false}
        style={styles.input}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        error={error}
      />

      {error && <Text style={styles.error}>{errorText}</Text>}

      <CountryPicker
        show={show}
        lang="es"
        inputPlaceholder="Buscar su país"
        ListHeaderComponent={ListHeaderComponent}
        popularCountries={["NI", "US"]}
        pickerButtonOnPress={(item) => {
          setFieldValue(name, item.dial_code);
          setShow(false);
        }}
        onBackdropPress={() => setShow(false)}
        style={{
          modal: { height: 500 },
          line: styles.line,
          textInput: styles.textInput,
          countryButtonStyles: styles.countryButtonStyles,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "25%",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  input: {
    backgroundColor: "transparent",
    textAlign: "center",
  },
  textInput: {
    height: 50,
    paddingLeft: 15,
    backgroundColor: "transparent",
    borderColor: "#0f0f0f",
    borderWidth: 1,
    marginVertical: 5,
  },
  line: {
    height: 1,
    backgroundColor: "#0f0f0f",
  },
  countryButtonStyles: {
    height: 50,
    marginBottom: 5,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#0f0f0f",
  },
});
