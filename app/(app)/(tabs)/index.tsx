import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import HeaderPackages from "../../../components/HeaderPackages";
import PackageItem from "../../../components/PackageItem";
import { useSession } from "../../../contexts/authentication";
import useGetPackages from "../../../hooks/useGetPackages";

export default function Index() {
  const router = useRouter();
  const { packages, isLoading, reloadPackages } = useGetPackages();
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
          total: section.data.length,
          totalData: section.data,
          data: section.data.slice(0, 2),
        }))}
        ListHeaderComponent={
          <HeaderPackages name={session.name} lockerCode={session.lockerCode} />
        }
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
                    router.push(`/detailSection?section=${section.path}`)
                  }
                >
                  <Text>Ver todos</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null
        }
        stickySectionHeadersEnabled={false}
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
