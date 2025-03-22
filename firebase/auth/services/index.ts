import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, database } from "../../index";
import generateLockerCode from "../../../utils/generateLockedCode";
import { Toast } from "toastify-react-native";
import getCustomErrorMessage from "../../../utils/firebaseErrors";

interface User {
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
}

export async function registerUserService(user: User) {
    const { email, password, name, lastName, phone } = user;

    try {
        // Registrar usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Generar código único de casillero
        const lockerCode = generateLockerCode(name, lastName);

        // Guardar usuario en Firestore
        const usersRef = collection(database, "users");
        const userCreated = await addDoc(usersRef, {
            uid,
            name,
            lastName,
            email,
            phone,
            lockerCode
        });

        console.log("Usuario registrado con éxito:", userCreated);
        return userCredential.user;
    } catch (error) {
        console.log(typeof error, Object.keys(error), "******", error.code)
        Toast.error(getCustomErrorMessage(error.code))
        return null
    }
}