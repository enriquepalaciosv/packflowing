import React from "react";
import { NativeSyntheticEvent, StyleProp, StyleSheet, Text, TextInputFocusEventData, View, ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";

interface InputFormikProps {
    name: string;
    label: string;
    defaultValue?: string;
    value: string;
    error: boolean;
    errorText: string;
    handleChange: (text: string) => void;
    handleBlur: (text: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    keyboardType?: "default" | "email-address" | "phone-pad";
    secureTextEntry?: boolean;
    style?: StyleProp<ViewStyle>
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

export default function InputFormik({
    style = {},
    label,
    defaultValue = "",
    value,
    error,
    errorText,
    handleChange,
    handleBlur,
    keyboardType = "default",
    secureTextEntry = false,
    autoCapitalize = "sentences"
}: InputFormikProps) {
    return (
        <View style={style}>
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
                autoCapitalize={autoCapitalize}
                error={error}
            />
            {error && <Text style={styles.error}>{errorText}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "transparent",
    },
    error: {
        color: "red",
        fontSize: 12
    },
});
