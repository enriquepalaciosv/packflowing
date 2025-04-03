import { Stack, useLocalSearchParams } from "expo-router";
import { SectionList, StyleSheet, View } from "react-native";
import useGetPackages from "../../hooks/useGetPackages";
import groupAndSortPackagesByRastreo from "../../utils/groupPackagesByDate";
import PackageItem from "../../components/PackageItem";
import { Text } from "react-native-paper";
import { Paquete } from "../../interfaces/packages";
import { useSession } from "../../contexts/authentication";
import React from "react";
import formatearFecha from "../../utils/formatDate";
import { actionPackageByRastreo, statusMapping } from "../../utils/mappingText";

export default function ListAllPackages() {
  const params = useLocalSearchParams(); // Obtener el nombre de la sección
  const sectionParams = params.section as string;
  const { packages, isLoading } = useGetPackages();
  const { session } = useSession();
  const [packagesByStatus, setPackagesByStatus] =
    React.useState<{ title: string, data: Paquete[] }[]>(null);

  React.useEffect(() => {
    if (packages) {
      setPackagesByStatus(
        groupAndSortPackagesByRastreo(
          packages.find((item) => item.path === sectionParams).data
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
          title: statusMapping[sectionParams] || "",
          headerTintColor: "#0f0f0f",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <SectionList
        keyExtractor={(_, index) => index.toString()}
        sections={packagesByStatus}
        ListHeaderComponent={null}
        ListEmptyComponent={() => <></>}
        renderSectionHeader={({ section }) => (
          <View
            style={{
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text variant="titleMedium" style={{ marginVertical: 10 }}>
              {formatearFecha(section.title)}
            </Text>
          </View>)
        }
        stickySectionHeadersEnabled={false}
        stickyHeaderHiddenOnScroll={false}
        renderItem={({ item, section }) => (
          <PackageItem
            section={statusMapping[sectionParams]}
            via={item.via}
            title={item.idRastreo}
            name={`${actionPackageByRastreo[sectionParams]} el ${formatearFecha(section.title)}`}
          />
        )}
        contentContainerStyle={styles.sectionList}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionList: {
    paddingBottom: 20,
    paddingHorizontal: 20
  }
})
