import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { registerUserService } from "../firebase/auth/services";

export default function useRegisterFormik() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Validaciones
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("El nombre es obligatorio"),
        lastName: Yup.string().required("El apellido es obligatorio"),
        email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
        phone: Yup.string()
            .matches(/^\+\d{1,3}\d{7,12}$/, "Número de teléfono inválido")
            .required("El teléfono es obligatorio"),
        password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .required("La contraseña es obligatoria"),
    });

    // Formik para manejar el formulario
    const formik = useFormik({
        initialValues: {
            name: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);

            try {
                const user = await registerUserService(values);
                if (user) {
                    // Redirige al dashboard después del registro
                    router.replace("/sign-in");
                }
            } catch (err) {
                console.log({ err })
            }

            setLoading(false);
        },
    });

    return { ...formik, loading };
}
