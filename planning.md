# Estado actual

| Operación | Estado | Archivo |
| --- | --- | --- |
| Create | ✅ | app/(tabs)/AddScreen.js |
| Read (lista) | ✅ | app/(tabs)/HomeScreem.js |
| Read (detalle) | ✅ | app/(tabs)/DetailScreen.js |
| Update | ✅ | app/(tabs)/EditScreen.js |
| Delete | ✅ | app/(tabs)/DetailScreen.js |

> Nota: como indica AGENTS.md, antes de tocar código de expo-router hay que revisar los docs versionados de Expo v57 (cambios en convenciones de rutas, Stack, etc.) antes de escribir nada.

## Fase 1 — Completar el CRUD (prioridad alta) ✅ completada

1. Update ✅
   - Nueva pantalla `EditScreen.js` que recibe `id` por params.
   - Carga los datos existentes con `getDoc` y precarga el formulario.
   - Guarda cambios con `updateDoc(doc(db, 'contactos', id), {...})`.
   - Botón "Editar" en `DetailScreen.js` que navega a esta pantalla.

2. Delete ✅
   - Botón "Eliminar" en `DetailScreen.js`.
   - Confirmación con `Alert.alert` (evita borrados accidentales).
   - `deleteDoc(doc(db, 'contactos', id))` + `router.back()` de vuelta a la lista.
   - La lista se refresca sola al recuperar el foco (`useFocusEffect` en `HomeScreem.js`), no requirió cambios adicionales.

3. Ruta registrada en `app/(tabs)/_layout.js` (`Stack.Screen name="EditScreen"`).

## Fase 2 — Robustez y validación ✅ completada

- Validación de formulario más estricta ✅ — `utils/validarContacto.js` centraliza las reglas (nombre ≥ 3 caracteres, teléfono con formato válido de 7-15 dígitos, ciudad ≥ 2 caracteres) y la usan tanto `AddScreen.js` como `EditScreen.js`.
- Manejo de errores consistente ✅ — se extrajeron `hooks/useContactos.js` (lista, con `refetch` y recarga en `useFocusEffect`) y `hooks/useContacto.js` (contacto individual, con `refetch`). `HomeScreem.js`, `DetailScreen.js` y `EditScreen.js` ya no repiten el patrón loading/error/fetch.
- Estados vacíos y de error ✅ — `EditScreen.js` ahora también distingue "cargando" / "error de conexión" / "contacto no encontrado", igual que `DetailScreen.js`.
- Reglas de seguridad de Firestore ⚠️ — se agregó `firestore.rules` (raíz del proyecto) validando la forma y longitud mínima de los campos (`nombre`, `telefono`, `ciudad`) para reemplazar el modo de prueba abierto sin expiración. **Falta desplegarlas**: no hay `firebase.json`/`.firebaserc` en el repo ni acceso a la consola de Firebase del proyecto, así que hay que subirlas manualmente (`firebase deploy --only firestore:rules` o pegarlas en la consola). Además, como la app no tiene Firebase Auth, las reglas no restringen por usuario — si se requiere eso, es trabajo adicional fuera de este plan.

## Fase 3 — UX / UI ✅ completada

- Búsqueda/filtro ✅ — `HomeScreem.js` agrega un `TextInput` que filtra por nombre, teléfono o ciudad (client-side, sobre los contactos ya cargados) y distingue "colección vacía" de "sin resultados de búsqueda".
- Pull-to-refresh ✅ — `hooks/useContactos.js` expone un estado `refreshing` separado de `loading` (vía `fetchContactos({ silent: true })`) para no tapar la lista con el spinner de pantalla completa; `HomeScreem.js` conecta `RefreshControl` a la `FlatList`. El `useFocusEffect` original se mantiene intacto para la recarga al enfocar la pantalla.
- Loading states por acción ✅ (ya estaba resuelto desde la Fase 1) — `AddScreen.js`, `EditScreen.js` (guardando) y `DetailScreen.js` (eliminando) ya deshabilitan el botón y muestran `ActivityIndicator` + texto de progreso.
- Consistencia visual ✅ — auditoría con la skill `ui-design`: el input de búsqueda reutiliza el mismo estilo que los inputs de `AddScreen`/`EditScreen`; se detectó y corrigió que el estado de error de red en `HomeScreem.js` se veía como texto gris neutro (igual que "vacío") mientras que `DetailScreen`/`EditScreen` usan una tarjeta roja (`errorCard`/`errorText`) para el mismo caso — ahora las tres pantallas comparten el mismo tratamiento visual de error.
  - Nota (no aplicada, fuera del pedido explícito): a diferencia de Add/Detail/Edit, `HomeScreem.js` no tiene un título de 24px en la parte superior (tiene `headerShown: false` y arranca directo con el botón de agregar). Es una posible inconsistencia de jerarquía, pero como parece una decisión de diseño deliberada (pantalla principal minimalista) y no estaba en el alcance pedido, se deja documentada en vez de cambiarla sin confirmar.
- Validación ejecutada: `npm run lint` sin errores tras los cambios (se corrigió también un error preexistente de la Fase 2 en `EditScreen.js`: `setState` síncrono dentro de un efecto).
- No se pudo verificar visualmente en un dispositivo/emulador real en este entorno (búsqueda, pull-to-refresh y el nuevo estado de error de Home quedan pendientes de probar a mano).

## Fase 4 — Calidad técnica ✅ completada (alcance acordado con el usuario)

- Tipado ✅ (alcance reducido, decisión del usuario) — se descartó migrar `app/(tabs)/*.js` a `.tsx`; solo la nueva capa de datos quedó en TypeScript (`services/contactos.ts`), con un tipo `Contacto`/`ContactoInput` compartido. Las pantallas siguen en `.js` sin tipos, igual que antes.
- Capa de datos ✅ — `services/contactos.ts` centraliza `getContactos`, `getContacto`, `createContacto`, `updateContacto`, `deleteContacto`. `hooks/useContactos.js`, `hooks/useContacto.js`, `AddScreen.js`, `EditScreen.js` y `DetailScreen.js` ya no llaman a Firestore (`addDoc`/`updateDoc`/`deleteDoc`/`getDoc`/`getDocs`) directamente, solo a estas funciones.
- Rename ✅ — `HomeScreem.js` → `HomeScreen.js` (con `git mv` para conservar el historial), actualizado el `Stack.Screen name` en `app/(tabs)/_layout.js` y las referencias en `README.md` y las skills del repo (`mobile-frontend`, `ui-design`).
- Pruebas ⏭️ omitidas — el usuario pidió no agregarlas por ahora (ni automatizadas ni smoke-test manual documentado). Queda pendiente si se retoma más adelante.
- Validación ejecutada: `npm run lint` y `npx tsc --noEmit` sin errores.
- No se pudo levantar el emulador/Expo Go en este entorno para confirmar visualmente que el rename y la nueva capa de datos no rompieron nada en tiempo de ejecución.

## Orden sugerido de ejecución

1. Fase 1 completa (CRUD funcional) — es lo pedido explícitamente.
2. Fase 2 (robustez), en paralelo al Fase 1 si se extrae el hook de datos primero.
3. Fase 3 y 4 como mejoras incrementales.
