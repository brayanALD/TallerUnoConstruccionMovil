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

## Fase 2 — Robustez y validación

- Validación de formulario más estricta (formato de teléfono, longitud de nombre) en Add/Edit.
- Manejo de errores consistente (hoy cada pantalla repite su propio patrón loading/error) → extraer un hook `useContactos()` / `useContacto(id)` para no duplicar lógica de Firestore.
- Estados vacíos y de error ya existen en Home; replicarlos en la nueva lógica.
- Confirmar reglas de seguridad de Firestore (`firestore.rules`) — hoy no hay archivo de reglas visible; revisar que no queden abiertas en modo test indefinidamente.

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
