import { browserLocalPersistence, initializeAuth, setPersistence } from 'firebase/auth';
import app from "..";

const getAuth = async () => {
    const auth = initializeAuth(app);
    await setPersistence(auth, browserLocalPersistence);
}

export default await getAuth(); 