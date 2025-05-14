import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Card, Divider, IconButton, Text } from "react-native-paper";
import useGetPackageById from "../../hooks/useGetPackageById";
import formatearFecha from "../../utils/formatDate";
import { actionPackageByRastreo, statusMapping } from "../../utils/mappingText";
import * as Clipboard from "expo-clipboard";
import { Toast } from "toastify-react-native";

const TrackingDetails = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { packageData, loading } = useGetPackageById(id);
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(id);
    Toast.info("Se ha copiado el código de rastreo");
  };

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: 16,
          width: "100%",
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
      >
        <Text
          variant="titleLarge"
          style={{ width: "100%", fontWeight: "bold" }}
        >
          Código de Rastreo:
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            variant="titleMedium"
            style={{ color: "#F2994A", fontWeight: "bold", marginLeft: 8 }}
          >
            {id}
          </Text>
          <IconButton icon="content-copy" size={20} onPress={copyToClipboard} />
        </View>
      </View>

      <FlatList
        data={packageData.rastreo}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 16,
              height: 80,
            }}
          >
            <View style={{ width: 20, alignItems: "center", marginTop: 30 }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#007AFF",
                }}
              />
              {index !== packageData.rastreo.length - 1 && (
                <View
                  style={{ width: 2, height: 70, backgroundColor: "#007AFF" }}
                />
              )}
            </View>

            <View
              style={{
                flex: 1,
                padding: 12,
                marginLeft: 8,
                borderWidth: 0,
                backgroundColor: "transparent",
              }}
            >
              <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                {actionPackageByRastreo[item.estado]}
              </Text>
              <Text>{item.observaciones}</Text>
              <Text style={{}}>
                {`${formatearFecha(item.fecha)} a las ${item.hora}`}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{
          backgroundColor: "#f2f1f1",
          paddingHorizontal: 10,
        }}
      />

      <View style={{ paddingHorizontal: 16 }}>
        {packageData.observaciones && (
          <>
            <Text
              variant="titleMedium"
              style={{ marginTop: 16, fontWeight: "bold" }}
            >
              Observaciones
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
                marginBottom: 16,
              }}
            >
              <Text>{packageData.observaciones}</Text>
            </View>
          </>
        )}
        {packageData.contenido &&
          packageData.peso.monto &&
          packageData.peso.unidad && (
            <>
              <Text
                variant="titleMedium"
                style={{ marginTop: 16, fontWeight: "bold" }}
              >
                Contenido
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 8,
                  marginBottom: 16,
                }}
              >
                <Text>{packageData.contenido}</Text>
                <Text style={{ fontWeight: "bold" }}>
                  {packageData.peso.monto} {packageData.peso.unidad}
                </Text>
              </View>
            </>
          )}
        {packageData.peso.monto &&
          packageData.peso.unidad &&
          packageData.tarifa.moneda &&
          packageData.tarifa.monto && (
            <>
              <Divider />
              <Text
                variant="titleMedium"
                style={{ marginTop: 16, fontWeight: "bold" }}
              >
                Total
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                }}
              >
                <Text>Servicio de envío</Text>
                <Text style={{ fontWeight: "bold" }}>
                  ${packageData.tarifa.moneda}{" "}
                  {packageData.tarifa.monto * packageData.peso.monto}
                </Text>
              </View>
            </>
          )}
      </View>
    </SafeAreaView>
  );
};

export default TrackingDetails;
