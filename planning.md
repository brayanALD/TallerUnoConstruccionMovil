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

## Fase 3 — UX / UI

- Búsqueda/filtro de contactos en `HomeScreem.js`.
- Pull-to-refresh en la lista (además del `useFocusEffect` actual).
- Loading states por acción (guardando/editando/eliminando) en `AddScreen.js`.
- Revisar consistencia visual entre pantallas (ya usaste `ui-design` skill antes — aplicar mismo criterio a las pantallas nuevas).

## Fase 4 — Calidad técnica

- Tipar el proyecto (hay `tsconfig.json` y `.tsx` en componentes — evaluar migrar `app/(tabs)/*.js` a `.tsx`).
- Extraer capa de datos (`services/contactos.js`) con las funciones `getContactos`, `getContacto`, `createContacto`, `updateContacto`, `deleteContacto` en vez de llamar Firestore directo desde cada componente.
- Renombrar `HomeScreem.js` → `HomeScreen.js` (typo existente).
- Añadir pruebas mínimas o al menos un smoke-test manual documentado.

## Orden sugerido de ejecución

1. Fase 1 completa (CRUD funcional) — es lo pedido explícitamente.
2. Fase 2 (robustez), en paralelo al Fase 1 si se extrae el hook de datos primero.
3. Fase 3 y 4 como mejoras incrementales.
