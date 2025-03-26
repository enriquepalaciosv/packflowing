import { SafeAreaView, SectionList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import HeaderPackages from "../../components/HeaderPackages";
import PackageItem from "../../components/PackageItem";
import useGetUserData from "../../hooks/useGetUserData";

export default function Index() {
  const { userData } = useGetUserData();

  if (!userData) return <Text variant="labelSmall">Loading...</Text>;

  const sections: {
    title:
      | "Paquetes recibidos"
      | "Paquetes en tránsito"
      | "Paquetes listos para recoger"
      | "Paquetes entregados";
    data: string[];
  }[] = [
    { title: "Paquetes recibidos", data: ["1"] },
    { title: "Paquetes en tránsito", data: ["1", "2", "3", "4"] },
    { title: "Paquetes listos para recoger", data: ["1", "2", "3", "4"] },
    { title: "Paquetes entregados", data: ["1", "2", "3", "4"] },
  ];

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SectionList
        keyExtractor={(_, index) => index.toString()}
        sections={sections.map((section) => ({
          ...section,
          total: section.data.length, // Número total de paquetes
          totalData: section.data, // Listado completo de paquetes
          data: section.data.slice(0, 2), // Lista con los primeros dos paquetes más recientes
        }))}
        ListHeaderComponent={
          <HeaderPackages
            name={userData.name}
            lockerCode={userData.lockerCode}
          />
        }
        renderSectionHeader={({ section }) => (
          <Text
            variant="titleMedium"
            style={{ marginVertical: 10 }}
          >{`${section.title} (${section.total})`}</Text>
        )}
        renderItem={({ item, section }) => (
          <PackageItem
            section={section.title}
            via="air"
            title="TBA319764923837"
            name="ENRIQUE PALACIOS VARGAS"
          />
        )}
        contentContainerStyle={styles.sectionList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: "#f0f0f0" },
  sectionList: { padding: 20 },
});
