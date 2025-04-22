import admin from "firebase-admin";
import serviceAccount from "";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const sendNotification = async () => {
  const message = {
    token: "",

    notification: {
      title: "Notificación de prueba",
      body: "Esta es una prueba con la API v1",
    },

    data: {
      screen: "detailPackage",
      id: "PKG_ENTREGADO_5",
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Notificación enviada:", response);
  } catch (error) {
    console.error("❌ Error al enviar la notificación:", error);
  }
};

sendNotification();
