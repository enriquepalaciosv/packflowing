
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
