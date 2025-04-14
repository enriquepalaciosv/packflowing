const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");
const fs = require("fs");

// Ruta a tu archivo JSON descargado de la consola
const serviceAccount = require("./packflowing.json");

// ID del proyecto (lo ves en Firebase)
const projectId = "packflowing-3ee65";

// Token del dispositivo (el que obtuviste con Expo)
const deviceToken =
  "5b8c739759656e52b769fb3a2dc4537c21da73df50365ea53d4e86cfaadcef49";

async function getAccessToken() {
  const auth = new GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
  });

  const client = await auth.getClient();
  console.log({ client });
  const token = await client.getAccessToken();
  console.log({ token });
  return token.token;
}

async function sendNotification() {
  const accessToken = await getAccessToken();

  const message = {
    message: {
      token: deviceToken,
      notification: {
        title: "🔔 Notificación de prueba",
        body: "Enviada con la API HTTP v1 desde Node.js",
      },
    },
  };

  try {
    const response = await axios.post(
      `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
      message,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Notificación enviada:", response.data);
  } catch (error) {
    console.error(
      "❌ Error al enviar notificación:",
      error.response?.data || error.message
    );
  }
}

sendNotification();
