import { useEffect, useState } from "react";
import { useSession } from "../contexts/authentication";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../firebase";

export default function useGetUserData() {
  const [userData, setUserData] = useState(null);
  const { session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.uid) {
        const userRef = doc(database, "users", session.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          // Agrego la propiedad id al objeto userData
          setUserData({ ...docSnap.data(), id: session.uid });
        }
      }
    };

    fetchUserData();
  }, [session.uid]);

  return {
    userData,
  };
}
