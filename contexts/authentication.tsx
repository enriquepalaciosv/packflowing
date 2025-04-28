import {
  createContext,
  useContext,
  useEffect,
  type PropsWithChildren,
} from "react";
import { useStorageState } from "../hooks/useStorageState";
import { User } from "../interfaces/user";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext<{
  signIn: (user: {
    id: string;
    name: string;
    lastName: string;
    lockerCode: string;
    token: string;
  }) => void;
  signOut: () => void;
  session?: User | null;
  updateSession: (user: Partial<User>) => void;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  updateSession: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  useEffect(() => {
    const loadSession = async () => {
      const stored = await SecureStore.getItemAsync("session");
      if (stored) setSession(JSON.parse(stored));
    };

    loadSession();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setSession(null);
        await SecureStore.deleteItemAsync("session");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: (user: User) => {
          setSession(user);
        },
        signOut: () => {
          setSession(null);
        },
        updateSession: async (updatedFields: Partial<User>) => {
          if (!session) return;

          const updatedSession = { ...session, ...updatedFields };
          await SecureStore.setItemAsync(
            "session",
            JSON.stringify(updatedSession)
          );
          setSession(updatedSession);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
