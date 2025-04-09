import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { updatePasswordService } from "../firebase/auth/services";

export default function useChangePasswordFormik(hideModal: () => void) {
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .required("La contraseña es obligatoria"),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
            .required("Por favor, repite la contraseña"),
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            repeatPassword: ""
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);

            try {
                await updatePasswordService(values.password);
                resetForm();
            } catch (err) {
                console.log({ err })
            } finally {
                setLoading(false);
                hideModal();
            }
        },
    });

    return { ...formik, loading };
}
