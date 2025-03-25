import { Slot } from 'expo-router';
import { SessionProvider } from '../contexts/authentication';
import ToastManager from 'toastify-react-native';

export default function Root() {
  return (
    <SessionProvider>
      <ToastManager
        position='bottom'
        textStyle={{
          fontSize: 14,
          color: "#fff"
        }}
        style={{
          width: "100%",
          backgroundColor: "#222",
          borderRadius: 8,
          shadowColor: "#000",
        }}
      />
      <Slot />
    </SessionProvider>
  );
}