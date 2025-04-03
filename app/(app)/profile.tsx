import { Text, TouchableOpacity, View } from "react-native";
import { useSession } from "../../contexts/authentication";

export default function Profile() {
  const { signOut } = useSession();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => signOut()}
        style={{
          borderWidth: 2,
          borderColor: "#0f0f0f",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
}
