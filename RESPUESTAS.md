PARTE 1 - Preguntas 1 a 4

Pregunta 1 - Entorno de desarrollo y sistema operativo

a)  
    complete la tabla explicando que papel cumple cada pieza entorno de desarrollo 
    movil.

    Node.js y npm:
        Node.js es la que se encarga de ejecutar dentro de un  proyecto el lenguaje 
        de JavaScript. npm es para la logistica de descarga de paquetes de un proyecto.

    Metro bundler:
        Es un empaquetador pensado para ser usado en proyectos de JSdonde se hace 
        uso de React-Native.

    JDK y Android SDK:
        El JDK se usa como herramienta para compilar proyectos. Android SDK se usa 
        como herramienta de compilación y emular.

    Xcode:
        Entorno de desarrollo para dispositivos de Apple que se usa para compilar, 
        emular app nativas para dispositivos moviles de Apple.

    Expo Go:
    App para ejecutar proyectos moviles programados con React-Native

b)  
    Un estudiante con Windows y otro con Linux quieren compilar la misma aplicación 
    para iOS. Explique por qué ninguno de los dos puede hacerlo en su propia máquina 
    y mencione dos alternativas reales para que igual logren probar y publicar la app.

        R/ Por las aplicaciones de la Suit de los productos Apple, especificamente 
        para los dispositivos con sistema operativo IOS requiere de una lincencia 
        para el uso de las Suits que esta ligada a la posecion de una computadora 
        con el sistema operativo de la misma marca (Apple), es decir debe tener un 
        portatil o pc de mesa Mac con MacOS para hacer uso de la licencia gratuita 
        de Xcode y su suit de desarrollo.

        - Usar Expo GO en un dispositivo fisico Iphone, ya que solo requeriria hacer 
        la instalación de la app gratuita desde la tienda de aplicaciones para proovar 
        el proyecto dentro del dispositivo fisico desarrollando y proovando al tiempo 
        todo el proceso de desarrollo.

        - Hacer uso de simuladores de IOS en el navegador web para ejecutar el proyecto 
        en una plataforma web.

c)  
    ¿Qué son las variables de entorno del sistema operativo y por qué el emulador de 
    Android falla cuando ANDROID_HOME o el PATH están mal configurados? Explique 
    la diferencia entre una variable de usuario y una variable de sistema.

        R/ Una variable de entorno es un valor que le indica al sistema donde estan 
        ubicadas las librerias y los ejecutables. La causa de falla del emular es 
        por que ANDROID_HOME o el PATH estan mal configuarados para trabajar el 
        proyecto de React-Native y al ponerse a correr no encuentra las herramientas
        y demas componentes necesarios para que el aplicativo funcione.

        - Variable de usuario: esta se usa solamente para la seccion del usurio luego 
        que este haya hecho inicio de seccion.

        - Variable de sistema: esta se aplica para todos los usurios y los procesos 
        que necesitan hacer uso o interactuar con el sistema operativo.

d)  
    Compare el flujo de trabajo con Expo frente a React Native CLI: mencione dos 
    ventajas y dos limitaciones de cada uno, e indique en qué situación elegiría 
    cada opción.

    Ventajas
        Expo:
        Su configuración es casi que imediata, su actualización es rapida gracias 
        a Expo GO.

        React Native CLI:
        Se tiene un acceso completo al codigo fuente del proyecto desarrollado.

    Limitaciones
        Expo:
        Los paquetes iniciales de lo que hace uso son mas pesados, es limitante 
        para usar librerias con codigo nativo sin hacer un "Prebuild".

        React Native CLI:
        La configuracion de su entorno se considera compleja y que esta propensa 
        a errores, requiere un dispositivo Mac para poder usar la version de IOS.

    Cuando elegirla?

        Expo:
        Esta es recomendada para hacer prototipos, aplicaciones medianas o cuando 
        se busca velocidad en el desarrollo  y un despliegue rapido.


Pregunta 2 - Fundamentos de React Native

a)
    React Native no renderiza HTML. Complete la equivalencia entre el elemento 
    web y el componente que cumple esa función en React Native

        <div> = <View>
        <p>/<span> = <Text>
        <img> = <Image>
        <input> = <TextInput>
        Lista larga con scroll = <FlatList>/<SectionList>

b)
    Explique tres diferencias entre los estilos de React Native y el CSS tradicional. 
    Incluya obligatoriamente el valor por defecto de flexDirection y por qué esa 
    decisión tiene sentido en un dispositivo móvil.

        -Los estilos no se hacer uso de una herrencia automitica a elementos hijos

        -Los valores numericos son estados independentes de la densidad de pixeles

        -Todo componente <View> es un display:flex
            flexDirection por defecto es column con diferencia que en CSS que es 
            row,esto tiene sentido porque la orientación predominante es vertical 
            y los elementos se organizan de arriba a abajo.

c)
    ¿Cuál es la diferencia entre props y estado? Dé un ejemplo de un dato que 
    debería ser prop y uno que debería ser estado dentro de una pantalla de lista 
    de productos.

        Props: los props son parametros pasados o herredados de un componente madre
        a un componente hijo para ajustar su configuracion de visualizacion.
        Ej: el prop categotiaID es recibido desde un componente madre

        Estado: el estado o state son datos cambiantes internos que son adminstrados
        por el componente que, al cambiar, provocar un renderizado nuevo.
        Ej: de forma interna se tiene el estado busquedaTexto lo que escribe el 
        usuario en la barra de busqueda o la lista de datos cargados de producto

Pregunta 3 - Manejo de pantalla y navegacion

a)
    Describa para qué sirve cada tipo de navegador y proponga un caso de uso real 
    para cada uno.

        Stack:
            ¿Para que sirve? Sirve para organizar pantallas en una pila que se 
            organiza de forma jerarquica.
            Caso de uso: 
                Flujo de compra: lista de productos -> detalle de productos ->
                carrito -> confirmacion

        Tabs:
            ¿Para que sirve? Sirve para cosas como tener una barra fija en la parte
            superior para alternar entre secciones principales.
            Caso de uso:
                App principal con pestañas: inicio, buscar, notificaciones, perfil.

        Drawer:
            ¿Para que sirve? sirve para hacer uso de un menu lateral deslizante 
            para accesos secundarios.
            Casos de uso:
                App corporativa con menu desplegable: confiiguracion, terminos, ayuda
                cerrar sesion.

b)
    ¿Qué función cumple el contenedor que envuelve toda la navegación de la app y 
    por qué debe existir uno solo en todo el proyecto?

        El contenerdor <NavigationContainer> gestiona el centro de navegacion, mantiene
        el estado general del historial y vincula los gestos del sistema. Debe existir 
        uno solo en el nucleo del proyecto para asegurar un unico origen de verdad del
        estado de las pantallas.

c)
    Explique cómo se envía un parámetro de una pantalla a otra al navegar y cómo 
    lo lee la pantalla de destino. ¿Qué tipo de dato conviene enviar: el objeto 
    completo o únicamente su identificador? Justifique.

        Envío: navigation.navigate('Detalle', { id: 'contacto_123' })
        Lectura mediante el hook useRoute()
        Tipo de datos: conviene enviar unicamente el identificador (ID). Enviar
        objetos completos puede desactualizar la informacion si cambia en la base
        datos y aumenta el consumo de memorias en el estado de navegacion. la pantalla
        de destino debe consultar los datos actualizados usando el ID.

d)
    Cuando el usuario navega de la pantalla A a la B y luego regresa, ¿la pantalla 
    A se vuelve a crear desde cero o conserva su estado? Explique qué implicación 
    tiene esa respuesta cuando la pantalla A muestra una lista que debe refrescarse 
    tras crear un registro nuevo.

        Al navegar de A a B y regresar, la pantalla A no se debe crear desde cero, se
        mantiene subida en la lsita de espera de la pila conservando su estado actual.
            -Su implicacion es que los hooks de montaje inicial no volverab a ejecutarse
            al volver a A. Para refrescar una lista trar crear un registro nuevo, 
            se debe usar useFocusEffect de React Navigation o suscribirse en tiempo 
            real a la fuente de datos.

e)
    ¿Qué diferencia hay en el comportamiento del regresar entre Android e iOS a 
    nivel de sistema operativo, y cómo lo resuelve la librería de navegación?

        Diferencia: Android cuenta con boton/gesto fisico global del sistema operativo
        para retroceder. IOS utiliza gestos de deslizamientos desde el borde izquierdo
        o botones en la barra superior.

        Solucion de la libreria: React Navigation trae las APIs unificando el comportamiento
        en el hook de navegacion.

Pregunta 4 - Configuracion base de Firebase

a)
    Enumere en orden los pasos necesarios para dejar un proyecto de Firebase listo 
    para ser consumido desde una app de React Native, desde la creación del proyecto 
    en la consola hasta la inicialización dentro del código.

        1- Crear un proyecto en la consola de Firebase
        2- Registrar una aplicacion Web
        3- Crear la base de datos Cloud Firestore y habilitar reglas de acceso
        4- Instalar el paquete en React Native con "npm install firebase"
        5- Crear archivo local de variables de entorno con las credenciales
        6- Crear archivos de inicializacion

b)
    Explique qué identifica cada una de estas claves del objeto de configuración.

        apiKey
        ¿Que identifica?
        Identificador publico del proyecto cliente para comunicarse con las APIs
        de Firebase.

        projectId
        ¿Que identifica?
        Identificador del proyecto en los servidores de Google/Firebase.

        appId
        ¿Que identifica?
        Identificador especifico de la aplicacion dentro del proyecto de Firebase.

        storageBucket
        ¿Que identifica?
        Identifica la direccion del servidor de almacenamiento de archivos asignado
        al proyectos.

c)
    La apiKey de Firebase queda visible en el paquete de la aplicación y cualquiera 
    puede extraerla. Explique por qué eso no constituye por sí solo una falla de 
    seguridad y dónde reside entonces la protección real de los datos.

        La apiKey de Firebase no es una clave secreta privada de servidor, es solo
        un identificador de cliente para asociar peticiones con un proyecto. La
        seguridad real no reside en esconder la API key, sino en las reglas de 
        seguridad de Firestore en el backend, las cuales evaluan la autenticacion
        y permisos de cada peticion.

d)
    ¿Qué diferencia hay entre iniciar Firestore en modo de prueba y en modo de 
    producción? ¿Qué riesgo concreto corre una app que se publica con las reglas 
    en modo de prueba?

        Modo de prueba: Otorga permisos de lecturas y escritura a cualquiera sin
        autenticacion.
        Modo de produccion: Bloquea todo el acceso por defecto hasta definir reglas.
        Riesgo: Publicar con reglas en modo de pruebas permite que cualquier persona
        que inspeccione la app modifique, borre o extraiga toda la base de datos.

e)
    Compare Cloud Firestore y Realtime Database en al menos tres aspectos, e indique 
    cuál elegiría para la aplicación de la Parte 2 y por qué.

        Estructura:
        Firestore usa Colecciones/Documentos, Realtime Database es un gran arbol
        JSON monolitico.

        Consultas:
        Firestore permite consultas complejas e indexadas, Realtime DB ofrece opciones
        limitadas de ordenamiento/filtrado.

        Escalabilidad y Cobro:
        Firestore escala automaticamente por operaciones, Realime DB cobra por ancho
        de banda y almacenamiento.

        Eleccion para la Parte 2: Cloud Firestore.
        Su modelo de colecciones y documentos se adapta perfectamente a una entidad
        perfectamente a una entidad estructurada como "contactos", facilitando la 
        lectura por ID y renderizado efeciente en una lista.