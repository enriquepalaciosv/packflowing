import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { loginUserService } from "../firebase/auth/services";
import { useSession } from "../contexts/authentication";

export default function useLoginFormik() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { signIn } = useSession();

  // Validaciones
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  // Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      setLoading(true);

      try {
        const user = await loginUserService(email, password);
        if (user) {
          signIn(user);
          // Redirige al dashboard después del registro
          return router.replace("/(app)");
        }
      } catch (err) {
        console.log({ err });
      }

      setLoading(false);
    },
  });

  return { ...formik, loading };
}
