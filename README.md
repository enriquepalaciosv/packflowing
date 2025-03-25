
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

## Autenticación

Primero se debe habilitar Firebase Auth, verificar que en Métodos de Acceso se encuentre habilitado solo el ingreso con email y contraseña

Luego, habilitar la base de datos Firestore, una vez dentro de la base de datos crear una tabla llamada **users** 

### Registro 

Para el registro se piden los siguientes datos: 
```
{
  name, 
  lastName, 
  email, 
  countryCode, 
  phone,
  password // Como mínimo 6 dígitos
}
```
Todos estos campos son requeridos

Este servicio, primero registra al usuario con email y contraseña dentro de Firebase Auth, este registro devuelve un **uid**

Luego tomando ese **uid** se inserta a Firestore un nuevo usuario con los siguiente campos

```
{
  name: string,
  lastName: string,
  email: string,
  countryCode: string, // Por ejemplo +505 | +1
  phone: number,
  lockerCode: string
}
```

Donde **lockedCode** es generado automaticamente con las iniciales del nombre y apellido, y seis números aleatorios únicos. Por ejemplo

Para el usuario "Enrique Palacios"
```
lockedCode = EP-123456
```

Antes de hacer un ingreso a la base de datos, se valida que el campo generado **lockedCode** no exista, en caso de que haya otro usuario registrado con ese mismo **lockedCode** se genera un nuevo código único