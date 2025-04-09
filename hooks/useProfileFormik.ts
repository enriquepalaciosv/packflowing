import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useSession } from "../contexts/authentication";
import { updateUserService } from "../firebase/auth/services";
import { User } from "../interfaces/user";

export default function useProfileFormik(session?: User) {
    const { updateSession } = useSession();
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("El nombre es obligatorio"),
        lastName: Yup.string().required("El apellido es obligatorio"),
        email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
        countryCode: Yup.string()
            .matches(/^\+\d{1,4}$/, "Prefijo inválido")
            .required("El prefijo es obligatorio"),
        phone: Yup.string()
            .matches(/^\d{7,12}$/, "Número de teléfono inválido")
            .required("El teléfono es obligatorio"),
    });

    const formik = useFormik({
        initialValues: {
            name: session.name ?? "",
            lastName: session.lastName ?? "",
            email: session.email ?? "",
            countryCode: session.countryCode ?? "",
            phone: session.phone ?? "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);

            try {
                await updateUserService(values);
                updateSession(values)
            } catch (err) {
                console.log({ err })
            } finally {
                setLoading(false);
            }
        },
    });

    return { ...formik, loading };
}
