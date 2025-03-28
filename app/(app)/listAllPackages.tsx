import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { statusMapping } from "../../utils/orderPackagesByStatus";
import useGetPackages from "../../hooks/useGetPackages";
import groupAndSortPackagesByRastreo from "../../utils/groupPackagesByDate";
import React from "react";
import getAllPackageUser from "../../firebase/packages/services";
import { Paquete } from "../../interfaces/packages";

export default function ListAllPackages() {
  const { section }: { section: "string" } = useLocalSearchParams(); // Obtener el nombre de la sección
  const { packages, isLoading } = useGetPackages();
  const [packagesByStatus, setPackagesByStatus] =
    React.useState<Record<string, Paquete[] | null>>(null);

  React.useEffect(() => {
    if (packages) {
      setPackagesByStatus(
        groupAndSortPackagesByRastreo(
          packages.find((item) => item.path === section).data
        )
      );
    }
  }, [packages]);

  if (isLoading || !packagesByStatus) {
    return <></>;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: statusMapping[section] || "Detalles",
          headerTintColor: "#0f0f0f",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <View>
        <Text>{JSON.stringify(packagesByStatus, null, 2)}</Text>
      </View>
    </>
  );
}
