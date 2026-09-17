---
name: mobile-frontend
description: Desarrolla y mantiene el frontend móvil de este proyecto (Expo v54 / React Native + expo-router, ver AGENTS.md). Úsala para crear o modificar pantallas y componentes de UI, layouts responsivos, navegación, formularios, listas, modales, estados de carga/vacío/error, consumo de APIs, accesibilidad y rendimiento. También para detectar problemas de UX o técnicos en pantallas existentes.
---

# Frontend de aplicaciones móviles

Trabajas sobre el frontend móvil de este proyecto (Expo v54 / React Native con `expo-router`; consulta `AGENTS.md` para cualquier API de Expo antes de asumir su comportamiento). Priorizas experiencia de usuario, accesibilidad, rendimiento y mantenibilidad, adaptándote a la arquitectura ya existente en vez de imponer una nueva.

## Flujo de trabajo (seguir en orden, sin saltar pasos)

### 1. Inspección
Antes de tocar código, identifica lo que ya existe en el proyecto:
- **Framework y routing:** Expo Router (`app/` con rutas basadas en archivos, grupos como `(tabs)`, `_layout.js`).
- **Librería de componentes:** los primitivos de React Native (`View`, `Text`, `TextInput`, `FlatList`, `TouchableOpacity`, etc.) usados directamente; revisa `components/` y `components/ui/` por si hay componentes reutilizables ya creados (ej. `themed-text.tsx`, `themed-view.tsx`, `icon-symbol`).
- **Sistema de estilos:** `StyleSheet.create` por archivo, colores hardcodeados o tokens en `constants/theme.ts`.
- **Gestión de estado:** `useState`/`useEffect`/`useCallback` locales por pantalla; no hay estado global (Redux/Zustand/Context) salvo que lo encuentres — confírmalo con Grep antes de asumir que hace falta uno.
- **Comunicación con APIs:** Firebase/Firestore (`config/firebase.js`, fuera de `app/` para que Expo Router no lo trate como ruta), llamadas directas (`getDocs`, `getDoc`, `addDoc`) dentro de cada pantalla.
- **Testing:** busca `*.test.js`, `*.spec.js`, `__tests__`; documenta si no existen.
- **Convenciones:** nombres de archivos, orden de imports, idioma de textos (español), manejo de errores con `Alert`/`console.error`.

Lee el/los archivo(s) objetivo completos y busca con Grep/Glob dónde se usan los componentes, hooks o pantallas que vas a tocar (imports, props, rutas de navegación que apuntan a ellos).

### 2. Análisis
- Identifica qué componentes existentes puedes reutilizar antes de crear nuevos.
- Detecta duplicación de lógica o de UI entre pantallas (ej. mismo patrón de loading/error repetido).
- Señala problemas concretos de UX o técnicos si los hay: falta de manejo de estado vacío/error, elementos táctiles demasiado pequeños, falta de `SafeAreaView`/insets, listas sin `keyExtractor` u optimización, imágenes sin dimensionar, texto sin soporte de accesibilidad (`accessibilityLabel`, roles), renderizados o cálculos costosos dentro del `render`/JSX.
- Si no hay problemas con mejora clara ni funcionalidad nueva que implementar, dilo explícitamente y no fuerces cambios.

### 3. Planificación
- Define los cambios mínimos necesarios, respetando la arquitectura y convenciones detectadas en el paso 1.
- Prioriza reutilizar/extender componentes existentes sobre crear nuevos.
- Si una funcionalidad requiere un componente nuevo, ubícalo siguiendo la estructura de carpetas ya usada (`components/`, `components/ui/`, `hooks/`, `constants/`).
- Si el cambio es grande, divídelo en pasos pequeños y verificables.
- No introduzcas librerías, gestores de estado global o sistemas de navegación nuevos sin justificarlo explícitamente y sin preguntar si no es obvio que hacen falta.

### 4. Implementación
Al crear o modificar componentes y pantallas, ten en cuenta:
- **Layouts adaptables:** usa `flex`, `%`, `Dimensions`/`useWindowDimensions` cuando el layout deba reaccionar al tamaño de pantalla; evita valores fijos en px para dimensiones que deban escalar.
- **Áreas seguras:** usa `SafeAreaView` / `useSafeAreaInsets` (si el proyecto ya los usa) en pantallas con contenido cerca de los bordes, notch o barra de estado.
- **Teclado:** usa `KeyboardAvoidingView`/`ScrollView` con `keyboardShouldPersistTaps` en formularios para que el teclado no tape los inputs; considera `keyboardType` apropiado por campo (como ya se hace con `phone-pad`).
- **Interacción táctil:** área táctil mínima razonable (~44x44), `activeOpacity`/feedback visual en elementos presionables, evita gestos ambiguos.
- **Estados de carga/vacío/error:** todo consumo de datos remoto debe cubrir explícitamente los tres estados (loading, lista vacía, error de red), siguiendo el patrón ya usado en `HomeScreen.js`/`DetailScreen.js`.
- **Conectividad intermitente:** maneja el `catch` de las llamadas a Firestore con feedback al usuario (`Alert` o mensaje en pantalla), no falles en silencio.
- **Accesibilidad:** agrega `accessibilityLabel`/`accessibilityRole`/`accessibilityHint` a elementos interactivos e imágenes cuando falten, sin sacrificarlos por apariencia visual. Verifica contraste de color razonable con los tokens/colores ya usados.
- **Consistencia visual:** reutiliza colores, tipografías y espaciados ya presentes en `StyleSheet` de otras pantallas o en `constants/theme.ts` en vez de inventar nuevos valores.
- **Separación de responsabilidades:** mantén el fetching/lógica de datos separado de la presentación cuando la pantalla lo permita sin sobreingeniería (ej. extraer una función `fetchX` en vez de mezclar todo en el JSX), pero no crees capas nuevas (hooks custom, servicios) si el patrón actual de la pantalla ya es simple y no se repite en más de un lugar.
- No dupliques lógica entre pantallas: si el mismo patrón aparece en 2+ lugares, extrae un componente u hook reutilizable en `components/` o `hooks/` siguiendo la convención existente.
- Aplica los cambios con Edit, no reescribas archivos completos salvo que sea imprescindible.
- No agregues comentarios que expliquen "qué hace" el código; solo si hay un motivo no obvio.

### 5. Optimización de rendimiento (solo si está justificada)
Revisa, sin optimizar prematuramente, problemas reales como:
- Renderizados innecesarios (funciones/objetos nuevos en cada render pasados como props a componentes memoizados, falta de `useCallback`/`useMemo` cuando hay evidencia de recomputo costoso).
- Listas: usa `FlatList`/`SectionList` en vez de `map` dentro de `ScrollView` para colecciones grandes; verifica `keyExtractor` estable.
- Cálculos costosos ejecutados en cada render en vez de memoizados.
- Imágenes sin redimensionar/comprimir para el tamaño en que se muestran.
- Peticiones de red repetidas o innecesarias (ej. refetch sin necesidad en cada render).
- Estado global usado para datos que solo necesita un componente local.
- Componentes con demasiadas responsabilidades mezcladas.

Toda optimización debe estar justificada por un problema real observado en el código o descrito por el usuario, no por sospecha.

### 6. Validación
Ejecuta lo que exista en el proyecto, en este orden si aplica:
- `npm run lint` (o el script de ESLint configurado).
- Type-checking si hay `tsconfig.json` con `tsc --noEmit` o script equivalente.
- Tests (`npm test` u otro script) si existen.
- Si no hay tests automatizados para la parte tocada, dilo explícitamente en el resumen.

### 7. Verificación visual
- Cuando sea posible, usa la skill/herramienta de ejecución del proyecto para levantar la app y observar el resultado (ej. skill `run`), probando la ruta principal y casos límite (pantalla vacía, error de red, teclado abierto, distintos tamaños si el simulador lo permite).
- Si no es posible verificar visualmente, dilo explícitamente en el resumen en vez de asumir que la UI quedó correcta.

### 8. Revisión
- Compara antes/después: misma funcionalidad salvo que el usuario haya pedido un cambio de comportamiento explícito.
- Verifica responsive behavior (distintos anchos, orientación si aplica), accesibilidad (labels/roles agregados o preservados), rendimiento (sin renders/listas/cálculos innecesarios introducidos) y consistencia visual con el resto de la app.
- Si cambiaste una firma pública (props de un componente, export), actualiza todos los llamadores.

### 9. Resumen
Al terminar, reporta en pocas líneas:
- Qué se creó/modificó y por qué (vínculo con el análisis del paso 2).
- Qué validaciones se ejecutaron y su resultado (lint/types/tests, o su ausencia).
- Qué se verificó visualmente y qué no se pudo verificar.
- Cualquier riesgo residual (ej. accesibilidad o responsive no probado en dispositivo real).

## Reglas de seguridad (no negociables)

1. Reutiliza componentes existentes antes de crear nuevos.
2. Respeta el sistema de diseño, estilos y tokens ya existentes; no inventes nuevos valores de color/espaciado si ya hay equivalentes en el proyecto.
3. No introduzcas dependencias, gestores de estado global o sistemas de navegación nuevos sin justificarlo y sin preguntar si no es obvio.
4. No dupliques lógica entre pantallas — extrae un componente/hook compartido si el patrón se repite.
5. Mantén los componentes pequeños y con responsabilidades claras.
6. No mezcles lógica de negocio con presentación cuando la arquitectura existente permita separarlas fácilmente; no fuerces una separación nueva si no está justificada.
7. No sacrifiques accesibilidad por apariencia visual.
8. No sacrifiques mantenibilidad por optimizaciones prematuras — toda optimización debe responder a un problema real.
9. No modifiques APIs o lógica de backend (Firebase/Firestore) salvo que sea estrictamente necesario para la tarea pedida y el usuario lo haya solicitado.
10. Si el código a tocar usa APIs de Expo, verifica contra la versión v54 (ver `AGENTS.md`) antes de asumir comportamiento.
11. Un cambio de comportamiento (fix de bug, nueva funcionalidad) fuera de lo pedido no es parte de esta skill — sepáralo y coméntaselo al usuario en vez de mezclarlo.
