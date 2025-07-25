import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { ActivityIndicator, Button } from "react-native-paper";
import { askAboutPackages } from "../firebase/ia";
import getAllPackageUser from "../firebase/packages/services";
import { useSession } from "../contexts/authentication";
import { Paquete } from "../interfaces/packages";
import Markdown from "react-native-markdown-display";
import { Feather, AntDesign } from "@expo/vector-icons";

interface ChatIaProps {
  visible: boolean;
  hideModal: () => void;
}

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export default function ChatIaModal({ visible, hideModal }: ChatIaProps) {
  const { session } = useSession();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hola, soy tu asistente inteligente. Indícame el tracking ID o pregúntame lo que sea sobre tus paquetes.",
    },
  ]);

  const handleResetMessages = () =>
    setMessages([
      {
        role: "assistant",
        text: "Hola, soy tu asistente inteligente. Indícame el tracking ID o pregúntame lo que sea sobre tus paquetes.",
      },
    ]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const nuevaPregunta: ChatMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, nuevaPregunta]);
    setQuestion("");
    setLoading(true);

    try {
      // @ts-expect-error
      const packages: Paquete[] = await getAllPackageUser(session.id);
      const respuesta = await askAboutPackages(packages, nuevaPregunta.text);

      const nuevaRespuesta: ChatMessage = {
        role: "assistant",
        text: respuesta,
      };

      setMessages((prev) => [...prev, nuevaRespuesta]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Hubo un error al consultar: " + err.message,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.messageContainer,
        item.role === "user" ? styles.userMessage : styles.assistantMessage,
      ]}
    >
      <Markdown style={markdownStyles}>{item.text}</Markdown>
    </View>
  );

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      style={styles.modal}
      avoidKeyboard
      backdropOpacity={0.4}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoiding}
        keyboardVerticalOffset={0}
      >
        <View style={styles.container}>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <TouchableOpacity onPress={handleResetMessages}>
              <Feather name="trash" size={26} />
            </TouchableOpacity>
            <TouchableOpacity onPress={hideModal}>
              <AntDesign name="close" size={28} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.chatList}
          />

          {loading && <ActivityIndicator style={{ marginVertical: 10 }} />}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Escribí tu pregunta..."
              value={question}
              onChangeText={setQuestion}
              placeholderTextColor={"#888888"}
            />
            <Button mode="contained" onPress={handleAsk} disabled={loading}>
              Enviar
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  keyboardAvoiding: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    height: "80%",
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 10,
  },
  chatList: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  messageContainer: {
    maxWidth: "90%",
    padding: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 12,
  },
  userMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
    marginRight: 10,
  },
  assistantMessage: {
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
});

const markdownStyles = {
  body: {
    fontSize: 16,
    color: "#333",
  },
  strong: {
    fontWeight: "900",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet_list_icon: {
    marginRight: 6,
  },
};
