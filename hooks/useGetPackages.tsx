import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";
import { useSession } from "../contexts/authentication";
import getAllPackageUser from "../firebase/packages/services";
import groupPackagesByStatus from "../utils/orderPackagesByStatus";

const useGetPackages = () => {
  const { session } = useSession();
  const [packages, setPackages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadPackages = async () => {
    try {
      setIsLoading(true);
      const userPackages = await getAllPackageUser(session.id);
      const sections = groupPackagesByStatus(userPackages);
      setPackages(sections);
    } catch (err) {
      Toast.error("Error al obtener información de los paquetes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    loadPackages();
  }, [session]);

  return { packages, isLoading, reloadPackages: loadPackages };
};

export default useGetPackages;
