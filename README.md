
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

También hay un menú de seguridad donde el usuario puede cambiar su contraseña. 


Un link de contacto que abre la aplicación de Whatsapp. Para configurar este número se agrego una variable de entorno **EXPO_PUBLIC_NUMBER_CONTACT**, con el prefijo del país + el número. Por ejemplo:

```
EXPO_PUBLIC_NUMBER_CONTACT=+12224545454
```

Y por último dentro del menú de seguridad aparece un link de **Políticas de privacidad** que redirige a una página externa en el navegador predeterminado. Esta **URL** se configura con una variable de entorno, llamada **EXPO_PUBLIC_POLITY_URL**. Por ejemplo: 

```
EXPO_PUBLIC_POLITY_URL=https://www.example/polity
```

Al final aparece un botón para cerrar la sesión del usuario