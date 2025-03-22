
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

Agregar variables de entorno dentro de app.json

```
  {
      ...
      "extra": {
            // API Keys del proyecto
            "apiKey": "",
            "authDomain": "",
            "projectId": "",
            "storageBucket": "",
            "messagingSenderId": "",
            "appId": "",
            "measurementId": "",
            // Cloud Messaging
            "vapidKey": ""
      },
      ...
  }
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

Si desea agregar otra imagen, sin eliminar la anterior. Hay que modificar el archivo **app.json**

Buscar la propiedad **plugins**, hay un array con dos elementos, se debe modificar la propiedad **image** del segundo objeto

```
...
"plugins": [
      ...
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "resizeMode": "cover",
          "backgroundColor": "#ffffff"
        }
      ],
...
```

Se puede modificar el color de fondo, y la propiedad **resizeMode** esta en **cover** para que ocupe todo el ancho de la pantalla ó establecer un ancho especifico con la propiedad **imageWidth** donde recibe un número. Por ejemplo 

```
"expo-splash-screen",
{
    "image": "./assets/images/splash-icon.png",
    "resizeMode": "contain",
    "imagewidth": 500,
    "backgroundColor": "#ffffff"
}
```
