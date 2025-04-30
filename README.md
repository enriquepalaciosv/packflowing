
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

Para modificar la imagen de Splash, simplemente hay que reemplazar la imagen **/assets/icon.png** por la imagen que desea 

ó

Si desea agregar otra imagen, sin eliminar la anterior. Hay que modificar el archivo **app/_layout**. **useSplashAnimation**, este hook maneja la animación (duración, delay, etc.) 

## Autenticación

Primero se debe habilitar Firebase Auth, verificar que en Métodos de Acceso se encuentre habilitado solo el ingreso con email y contraseña

Luego, habilitar la base de datos Firestore (no hace falta crear ninguna colección, se hace la conexión desde el servicio y se crean las tablas necesarias) 

## Registro 

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

## Login

Para el login, se pide email y contraseña

Este servicio, realiza el login, en el caso de que inicie sesión con éxito, guarda la información en localStorage (web) ó SecureStore (movil)

Si el email es incorrecto, o no existe o si la contraseña es incorrecta, arroja un error generico 

```
Email o contraseña incorrecta
```

## Recuperar contraseña

Se utiliza el servicio de reestablecimiento que ofrece Firebase Auth por defecto

El formulario de la app, pide el correo con el cual el usuario se registro, y se recibe las instrucciones por correo

El template del email se puede modificar facilmente desde la pantalla principal de Firebase Auth. Se debe ingresar a 

```
Autenticación > Plantillas > Reestablecer Contraseña
```

En esta pantalla aparece los datos del email, como "remitente", "de", "asunto", el cuerpo del email y "responder a" que por defecto no admite respuestas

En la parte inferior izquierda aparece un desplegable de idioma, el cual permite modificar el idioma del email y la pantalla de reestablecimiento 

```
Idioma de la plantilla
```

En el email se puede observar un link, este link redirige a una pantalla por defecto que brinda Firebase Auth, es un simple formulario donde se ingresa la nueva contraseña, y se envía. La página debería mostrar un mensaje de confirmación "Ahora puedes acceder con tu contraseña nueva"

Este link se puede cambiar por una URL de acción personalizada, por ejemplo alguna URL con un formulario ó otra opción es personalizar el servicio **sendPasswordResetEmail** para que el link abra la app 

## Paquetes

### Modelo de Paquetes

El modelo de paquetes esta conformado por distintos modelos como: 

Tarifa para determinar el costo del envío. 
```
Tarifa {
  monto: number;
  moneda: "USD" | "EUR" | "MXN"; // Puede incluir otras monedas
}
```

```
Ejemplo de tarifa {
  monto: 12;
  moneda: "USD"
}
```

Incluye también el objeto Peso, que determina el peso del producto y la unidad

```
Peso {
  monto: number;
  unidad: "lb" | "kg"; // Puede incluir más unidades si es necesario
}
```

```
Ejemplo de Peso {
  monto: 10;
  unidad: "kg"
}
```

Incluye también el objeto Rastreo para registrar un cambio en el estado del producto

```
Rastreo {
  fecha: string; 
  hora: string;
  estado: "recibido" | "en_transito" | "listo_para_retirar" | "entregado";
}

Ejemplo de Rastreo {
  fecha: "2025-03-27"; 
  hora: "10:00";
  estado: "recibido"
}
```
El modelo de Paquete quedaría de la siguiente manera: 

```
Paquete {
  idUsuario: string;
  idRastreo: string;
  estado: "recibido" | "en_transito" | "listo_para_retirar" | "entregado";
  via: "aereo" | "maritimo";
  peso: Peso;
  tarifa: Tarifa;
  contenido: string;
  total: number;
  rastreo: Rastreo[];
}
```

Una vez logueado el usuario, se realiza la petición para obtener los paquetes de ese usuario

Se ordenan por estado "Recibido", "En transito", "Listo para retirar" y "Entregado". Si no hay registro para alguno de los estados, no se muestra en pantalla

Solo se muestran los primeros 5 paquetes de cada estado, ordenados por el último registro del array de rastreo

Si una sección contiene más de 5 elementos aparece un botón de **Ver todos** que lleva a un pantalla donde se muestra un listado de paquetes del usuario, agrupados por fecha y ordenados por la hora en que fue actualizado (mostrando el más reciente primero)

***Detalles de un paquete

Al seleccionar un paquete de los listados, se lleva a una página con los detalles del mismo; timeline de los movimientos de paquete, observaciones (modificaciones sobre la vía del envío, error por mal etiquetado u otros errores generales). Tambien se mostrará, sólo si se ha establecido, peso del contenido. Y por último, costo total del envío, este solo aparece si el peso y la tarifa se han establecido anteriormente.

## Perfil

En esta pantalla se puede modificar información personal de usuario, como nombre, apellido, correo y número de teléfono.

Para poder modificar el correo, se necesita habilitar esta función desde Firebase Auth. Ingresando a Authentication, en la sección de **Configuración** aparece un menú de **Acciones del usuario**, allí se debe desmarcar la opción **Protección de enumeración de correo electronico**

```
Authentication > Configuración > Acciones del Usuario > Protección de enumeración de correo electronico
```

Al modificar el correo de acceso, el usuario recibe un email notificandole el cambio de correo y con un link para revertirlo

También hay un menú de seguridad donde el usuario puede cambiar su contraseña. 

Aparece un link de contacto que abre la aplicación de Whatsapp. Este número se obtiene de la base de datos, de la tabla agencia, por defecto crea un documento con los siguientes datos: 

```
Agencia {
  contacto: "+12224343434",
  politicaPrivacidad: "https://example.com/polity"
}
```

Los cuales pueden ser modificados desde Firestore, por la información que desee. 

Y por último dentro del menú de seguridad aparece un link de **Políticas de privacidad** que redirige a una página externa en el navegador predeterminado. Esta **URL** también de la tabla agencia en Firestore.

Al final aparece un botón para cerrar la sesión del usuario

## Chat IA 

Para configurar este chat, el primer paso es obtener la API Key para poder conectarnos a los modelos de AI de google. Ingresando a [AI Studio](https://aistudio.google.com/app/apikey) 

Una vez obtenida la **API Key**, se debe agregar al archivo como variable de entorno:

```
EXPO_PUBLIC_GOOGLE_API_KEY=
```

Este chat sólo se muestra si la agencia ha habilitado este servicio 

```
agencia.AI = true
```

La AI recibe un prompt con los paquetes del usuario logueado y se le indica que brinde información acerca de estos paquetes o cualquier duda que le consulte el usuario

## Notificaciones Push

Se debe realizar una serie de pasos antes de poder probar las notificaciones desde Firebase Messaging Cloud:
El primero es registrar las aplicaciones tanto para iOS como para Android, esto se realiza desde la configuración del proyecto, en el menú de General al finalizar aparece una sección con **Tus apps** 

```
Configuración del Proyecto > General > Tus apps
```

Solo importante al registrar la app es el ID del paquete para Apple y Nombre del paquete para Android, ya que se utilizan para configurar el archivo **app.json** y así generar los SDK.

Una vez registradas las apps, descargar el archivo **google-services.json.** para Android y **GoogleService-Info.plist** para iOS. Estos dos archivos deben ir en la raíz del proyecto (Mismo nivel que **app.json**)

El siguiente paso es configurar el archivo **app.json** para generar los prebuild. Se debe ubicar el objecto **ios** y **android**, que debe verse de la siguiente manera: 

```
"ios": {
  "supportsTablet": true,      
  "googleServicesFile": "./GoogleService-Info.plist", # Ubicación del archivo con las credenciales, si esta en la raíz del proyecto, debe quedar igual
  "bundleIdentifier": "com.example.packflowing" # Acá iría el id del paquete para iOS que elegiste al registrar la app
},
"android": {
  "adaptiveIcon": ...,
  "googleServicesFile": "./google-services.json", # Ubicación del archivo con las credenciales, si esta en la raíz del proyecto, debe quedar igual
  "package": "com.example.packflowing" # Acá iría el nombre del paquete para Android que elegiste al registrar la app
}
```
Luego de eso, puedes generar el prebuild de las app con el comando 

```
npx expo prebuild
```
Este comando genera las carpetas **/ios** y **/android**

Para poder recibir notificaciones, primero se debe obtener el **token** FCM. Se agregó un custom hook para obtener el token y lo guarda dentro de la base de datos para poder volver a enviarle notificaciones al usuario. Este codigo utiliza **@react-native-firebase** que es código nativo, por lo que se necesita crear un build para poder obtener este token.

Particularmente usé **EAS**, un servicio de Expo para crear build tanto para Android como para iOS (gratuito para Android, en iOS sólo si tienes cuenta de desarrollo para publicar aplicaciones)

### Crear build para Android con EAS 

Lo primero antes de crear cualquier build es:
 
* Contar con una cuenta en [EAS](https://expo.dev/signup)
* Instalar globalmente EAS Cli
```
npm install -g eas-cli
```

Luego, se debe inicial sesión con el comando
```
eas login
```
Este comando te va a pedir email y contraseña (son las credenciales del paso 1)

Y por último, enlazar el proyecto con EAS con el comando 
```
eas init
```
Este comando agrega al archivo **app.json** la propiedad **projectId** y **owner** y crea el archivo **eas.json**

* El último prerequisito es contar con una cuenta de Developer de Apple

El comando para comenzar a construir el build es 

iOS:
```
eas build --platform ios --profile development
```

Te va a pedir las credenciales de la cuenta de Developer de Apple 

Android
```
eas build --platform android --profile development
```

Este comando comienza a construir el build, una vez finalizado muestra en consola un QR, escanear con un dispositvo física para comenzar la instalación de la app

### Enviar notificaciones desde Firebase

Una vez instalada la app en tu dispositivo físico, debes loguearte y verificar que el token se guardo exitosamente en la base de datos para el usuario logueado. Ya teniendo este token se puede enviar notificaciones desde la consola de Firebase (esta funcionalidad es limitada, ya que solo muestra la notificación pero no se puede interactuar con ella, por ejemplo que rediriga a la pantalla de detalles)

```
Messaging > Crear la primera campaña 
```

Se puede enviar notificaciones **Mensajes de Firebase Notifications** cuando la app está cerrada, o **Mensajes desde la app de Firebase** cuando la app está abierta y en primer plano

Para cualquiera de las dos opciones, lleva a la misma pantalla donde podes editar **titulo**, **texto de la notificación** y **imagen de la notificación**. Para enviar una notificación, hacer click en **Enviar mensaje de prueba**, esto abre un modal donde pide el token FCM, pegar allí y hacer click en **Probar**


### Enviar notificaciones personalizadas 

Primero se debe obtener el archivo con las credenciales de la cuenta de servicios. Se debe ingresar desde Firebase, a **Configuración de proyecto** y al menú **Cuentas de Servicio**, deslizar hasta el final y hacer click en **Generar nueva clave privada**. Esto descarga un archivo **.json** que sirve para conectarse a los servicios de Firebase desde la libreria **firebase-admin**. Agregar este archivo a la raíz del proyecto

```
Configuración del Proyecto > Cuentas del Servicio > Generar nueva clave privada
```

Para enviar notificaciones que permitan al usuario acceder a la pantalla de detalles, se debe modificar el archivo **sendNotificationTest.ts**.

Primero modificar la línea 2, para que apunte al archivo **.json** descargando anteriormente. Luego, dentro del objeto **message**, **token** debe ser el mismo que el de la base de datos para el usuario que quieres enviar la notificación, **title** y **body** puede personalizarlo a tu gusto. Y el **id** debe coincidir con algún paquete que tenga registrado ese usuario (verificar en la base de datos que exista), por ejemplo 

```
{
  token: "",

  notification: {
    title: "Paquete está listo para retirar",
    body: "Su paquete x está listo para retirar. Ver más detalles",
  },

  data: {
    screen: "detailPackage",
    id: "PKG_ENTREGADO_X",
  },
}
```

Ejecutar este código con el comando

```
npx ts-node sendNotificationTest.ts
```

Esto debería mostrar en consola que la notificación fue enviada y deberías recibirla en tu dispositivo. Al hacer click, debe ingresar a la pantalla de detalles del producto especifico