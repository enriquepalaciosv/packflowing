import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import resetPassword, { loginUserService } from "../firebase/auth/services";

export default function useResetPasswordFormik() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Validaciones
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
  });

  // Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email } = values;
      setLoading(true);

      try {
        await resetPassword(email);
        router.replace("/sign-in");
      } catch (err) {
        console.log({ err });
      }

      setLoading(false);
    },
  });

  return { ...formik, loading };
}
