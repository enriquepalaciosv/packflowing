import admin from "firebase-admin";
import serviceAccount from "./packflowing-firebase-adminsdk-fbsvc-89edd6da3e.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const sendNotification = async () => {
  const message = {
    token: process.env.USER_NOTIFICATION_TOKEN,            
    notification: {
      title: "Pack Flowing",
      body: "Tu paquete está listo para retirar",
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
