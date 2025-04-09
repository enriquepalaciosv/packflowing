import { useEffect, useState } from "react"
import { getAgenciaByDefault } from "../firebase/agencia/services";


export default function getInfoAgencia() {
    const [agencia, setAgencia] = useState({
        contacto: "",
        politicaPrivacidad: ""
    });

    useEffect(() => {
        getAgenciaByDefault()
            .then((response: { contacto: string, politicaPrivacidad: string }) => setAgencia(response))
            .catch(error => console.log({ error }))
    }, [])

    return {
        ...agencia
    }
}