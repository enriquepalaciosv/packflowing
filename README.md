
# Pack Flowing

## Crear proyecto en Firebase

Desde la consola de Firebase, crear un nuevo proyecto

Registrar una nueva app (Desde el icono de configuración en la pantalla principal)

```
Configuración del Proyecto > General > Agregar App
```

Una vez registrada la app, se obtienen las credenciales del proyecto. Debería verse así

```
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
```

Al lado del menú General, aparece **Cloud Messaging**, acá habilitamos las notificaciones push

```
Cloud Messaging > Configuración Web > Generate key pair
```

Esto da dos claves, una pública y otra privada. Solo necesitamos la pública que corresponde a **vapidKey**
## Variables de Entorno

Agregar variables de entornos a el archivo .env (Ver .env.example)

```
  EXPO_PUBLIC_API_KEY=
  EXPO_PUBLIC_AUTH_DOMAIN=
  EXPO_PUBLIC_PROJECT_ID=
  EXPO_PUBLIC_STORAGE_BUCKET=
  EXPO_PUBLIC_MESSAGING_SENDER_ID=
  EXPO_PUBLIC_APP_ID=
  EXPO_PUBLIC_MEASUREMENT_ID=
  EXPO_PUBLIC_VAPID_KEY=
```
## Correr proyecto local

Clonar repositorio

```bash
  git clone https://github.com/enriquepalaciosv/packflowing.git
```

```bash
  cd packflowing
```

Instalar dependencias

```bash
  npm install
```

Correr el proyecto

```bash
  npx expo start
```

Se puede probar la app, desde la aplicación Expo Go, disponible en App Store para iOS o desde Play Store para Android

Una vez dentro de Expo Go, se escanea el código QR y listo!

## Splash Image

Para modificar la imagen de Splash, simplemente hay que reemplazar la imagen **/assets/images/splash-icon.png** por la imagen que desea 

ó

Si desea agregar otra imagen, sin eliminar la anterior. Hay que modificar el archivo **app/_layout**. **useSplashAnimation**, este hook maneja la animación (duración, delay, etc.) 

