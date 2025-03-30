import { createContext, useContext, type PropsWithChildren } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { User } from "../interfaces/user";

const AuthContext = createContext<{
  signIn: (user: {
    id: string;
    name: string;
    lastName: string;
    lockerCode: string;
  }) => void;
  signOut: () => void;
  session?: {
    id: string;
    name: string;
    lastName: string;
    lockerCode: string;
  } | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
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

  return (
    <AuthContext.Provider
      value={{
        signIn: (user: User) => {
          setSession(user);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
