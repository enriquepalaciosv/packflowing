import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Toast } from "toastify-react-native";
import getCustomErrorMessage from "../../../utils/firebaseErrors";
import generateLockerCode from "../../../utils/generateLockedCode";
import { auth, database } from "../../index";

interface User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  countryCode: string;
  phone: string;
}

async function isLockerCodeUnique(lockerCode: string) {
  const usersRef = collection(database, "users");
  const q = query(usersRef, where("lockerCode", "==", lockerCode));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty; // true si el código es único
}

export async function registerUserService(user: User) {
  const { email, password, name, lastName, phone, countryCode } = user;

  try {
    // Registrar usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

    // Generar código único de casillero
    let lockerCode = generateLockerCode(name, lastName);
    while (!(await isLockerCodeUnique(lockerCode))) {
      // Regenerar si ya existe
      lockerCode = generateLockerCode(name, lastName);
    }

    // Guardar usuario en Firestore
    await setDoc(doc(database, "users", uid), {
      name,
      lastName,
      email,
      countryCode,
      phone,
      lockerCode,
    });

    Toast.success("Usuario registrado con éxito");
    return userCredential.user;
  } catch (error) {
    Toast.error(getCustomErrorMessage(error.code));
    return null;
  }
}

export async function loginUserService(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    Toast.success("Ingreso exitoso");
    return user;
  } catch (error) {
    Toast.error(getCustomErrorMessage(error.code));
    return null;
  }
}
