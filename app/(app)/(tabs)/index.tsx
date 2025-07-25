import { useCallback, useState } from "react";
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Text } from "react-native-paper";
import HeaderPackages from "../../../components/HeaderPackages";
import PackageItem from "../../../components/PackageItem";
import RefreshAnimation from "../../../components/RefreshAnimation";
import { useSession } from "../../../contexts/authentication";
import useGetPackages from "../../../hooks/useGetPackages";
import { useRouter } from "expo-router";

export default function Index() {
  const { packages, isLoading, reloadPackages } = useGetPackages(); // Añadido `reloadPackages`
  const [refreshing, setRefreshing] = useState(false);
  const { session } = useSession();
  const router = useRouter();

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

  const allEmpty = packages.every((item) => item.data.length === 0);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderPackages name={session.name} lockerCode={session.lockerCode} />
      <ListPackages
        isLoading={isLoading}
        packages={packages}
        session={session}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView >
  );
};

const ListPackages = ({ isLoading, packages, session, refreshing, onRefresh }) => {
  const router = useRouter();

  return (
    <RefreshAnimation>
      <SectionList
        keyExtractor={(_, index) => index.toString()}
        sections={
          packages.every((item) => item.data.length === 0)
            ? []
            : packages.map((section) => ({
              ...section,
              total: section.data.length, // Número total de paquetes
              totalData: section.data, // Listado completo de paquetes
              data: section.data.slice(0, 5), // Solo los cinco más recientes
            }))}
        ListHeaderComponent={null}
        ListEmptyComponent={() => <ListyEmpty />}
        renderSectionHeader={({ section }) =>
          section.total ? (
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
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      `/(app)/listAllPackages?section=${section.path}`
                    )
                  }
                >
                  <Text>Ver todos</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null
        }
        stickySectionHeadersEnabled={false}
        stickyHeaderHiddenOnScroll={false}
        renderItem={({ item, section }) => (
          <PackageItem
            id={item.idRastreo}
            section={section.title}
            via={item.via}
            title={item.idRastreo}
            name={session.name + " " + session.lastName}
          />
        )}
        contentContainerStyle={[styles.sectionList, { flexGrow: 1 }]}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </RefreshAnimation>
  )
};

const ListyEmpty = () => (
  <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", marginTop: 50 }}>
    <Text variant="titleMedium" style={{ fontWeight: 400 }}>
      No hay información disponible aún
    </Text>
  </View>
)

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: "#f0f0f0" },
  sectionList: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: Platform.OS === "android" ? 200 : 170 },
});
