import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";

interface InputFormikProps {
    name: string;
    label: string;
    defaultValue?: string;
    value: string;
    error: boolean;
    errorText: string;
    handleChange: (text: string) => void;
    handleBlur: (text: string) => void;
    keyboardType?: "default" | "email-address" | "phone-pad";
    secureTextEntry?: boolean;
}

export default function InputFormik({
    name, label, defaultValue = "", value, error, errorText, handleChange, handleBlur, keyboardType = "default", secureTextEntry = false
}: InputFormikProps) {
    return (
        <>
            <TextInput
                label={label}
                defaultValue={defaultValue}
                value={value}
                onChangeText={handleChange}
                onBlur={handleBlur}
                style={styles.input}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                mode="outlined"
                error={error}
            />
            {error && <Text style={styles.error}>{errorText}</Text>}
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "transparent",
        borderColor: "0f0f0f"
    },
    error: {
        color: "red",
        fontSize: 12
    },
});
