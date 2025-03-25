import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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

async function isLockerCodeUnique(lockerCode: string) {
    const usersRef = collection(database, "users");
    const q = query(usersRef, where("lockerCode", "==", lockerCode));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // true si el código es único
}

export async function registerUserService(user: User) {
    const { email, password, name, lastName, phone } = user;

    try {
        // Registrar usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Generar código único de casillero
        let lockerCode = generateLockerCode(name, lastName);
        while (!(await isLockerCodeUnique(lockerCode))) {
            lockerCode = generateLockerCode(name, lastName); // Regenerar si ya existe
        }
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

        Toast.success("Usuario registrado con éxito")
        return userCredential.user;
    } catch (error) {
        Toast.error(getCustomErrorMessage(error.code))
        return null
    }
}