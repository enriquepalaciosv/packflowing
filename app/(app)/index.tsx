import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  RefreshControl,
  View,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { useState, useCallback, useEffect } from "react";
import HeaderPackages from "../../components/HeaderPackages";
import PackageItem from "../../components/PackageItem";
import useGetPackages from "../../hooks/useGetPackages";
import useGetUserData from "../../hooks/useGetUserData";
import { useSession } from "../../contexts/authentication";

export default function Index() {
  // const { userData } = useGetUserData();
  const { packages, isLoading, reloadPackages } = useGetPackages(); // Añadido `reloadPackages`
  const [refreshing, setRefreshing] = useState(false);
  const { session } = useSession();

  // Función para recargar paquetes al hacer pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await reloadPackages(); // Recarga los paquetes
    setRefreshing(false);
  }, [reloadPackages]);

  if (!packages) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text variant="labelSmall">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SectionList
        keyExtractor={(_, index) => index.toString()}
        sections={packages.map((section) => ({
          ...section,
          total: section.data.length, // Número total de paquetes
          totalData: section.data, // Listado completo de paquetes
          data: section.data.slice(0, 5), // Solo los cinco más recientes
        }))}
        ListHeaderComponent={
          <HeaderPackages name={session.name} lockerCode={session.lockerCode} />
        }
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
              {`${section.title} (${section.total})`}
            </Text>
            {section.total > 5 ? (
              <TouchableOpacity style={{}}>
                <Text>Ver todos</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
        stickySectionHeadersEnabled={false}
        stickyHeaderHiddenOnScroll={false}
        renderItem={({ item, section }) => (
          <PackageItem
            section={section.title}
            via={item.via}
            title={item.idRastreo}
            name={session.name + " " + session.lastName}
          />
        )}
        contentContainerStyle={styles.sectionList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: "#f0f0f0", marginBottom: 50 },
  sectionList: { padding: 20 },
});
