import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  getAuth,
  updateEmail,
  updatePassword,
  updateCurrentUser,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Toast } from "toastify-react-native";
import getCustomErrorMessage from "../../../utils/firebaseErrors";
import generateLockerCode from "../../../utils/generateLockedCode";
import { auth, database } from "../../index";
import cargarDatos from "../../packages/services/hardcode";
import { User } from "../../../interfaces/user";
import { capitalizeString } from "../../../utils/capitalizeString";

interface UserRegister {
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

export async function registerUserService(user: UserRegister) {
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
      name: capitalizeString(name),
      lastName: capitalizeString(lastName),
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

    // Obtener el documento del usuario desde Firestore
    const userDocRef = doc(database, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error(
        "No se encontró información del usuario en la base de datos."
      );
    }

    const userData = { id: user.uid, ...(userDocSnap.data() as User) };

    // Cargar datos de prueba solo si es necesario
    await cargarDatos();

    Toast.success("Ingreso exitoso");
    return userData as User;
  } catch (error) {
    Toast.error(getCustomErrorMessage(error.code));
    return null;
  }
}

export default async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    Toast.info(
      "Si el correo esta registrado, recibirá las instrucciones por el mismo"
    );
    return;
  } catch (error) {
    Toast.error(getCustomErrorMessage(error.code));
    return null;
  }
}

export async function updateUserService(user: Partial<UserRegister>) {
  const { name, lastName, email, phone, countryCode } = user;

  const auth = getAuth();

  try {
    if (auth.currentUser.email !== email) {
      await updateEmail(auth.currentUser, email);
    }

    const userRef = doc(database, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      name,
      lastName,
      email,
      countryCode,
      phone,
    });

    Toast.success("Perfil actualizado con éxito");
  } catch (err) {
    console.error("Error al actualizar en Auth:", err.message);
  }
}

export async function updatePasswordService(newPassword: string) {
  const auth = getAuth();

  try {
    await updatePassword(auth.currentUser, newPassword);
    Toast.success("Contraseña actualizada con éxito");
  } catch (error) {
    console.error("Error al actualizar en Auth:", error.message);
    Toast.error(getCustomErrorMessage(error.code));
  }
}
