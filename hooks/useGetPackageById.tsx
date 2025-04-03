import { useEffect, useState } from "react";
import { getPackageById } from "../firebase/packages/services";

export default function useGetPackageById(idRastreo) {
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!idRastreo) return; // Si no hay ID, no ejecutamos la petición

        const fetchPackage = async () => {
            try {
                setLoading(true);
                const data = await getPackageById(idRastreo);
                setPackageData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPackage();
    }, [idRastreo]);

    return { packageData, loading, error };
}
