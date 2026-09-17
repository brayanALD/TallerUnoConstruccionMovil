---
name: ui-design
description: Audita y mejora la calidad visual del frontend móvil de este proyecto (Expo v54 / React Native + expo-router). Úsala cuando el usuario pida mejorar el diseño visual, la paleta de colores, la tipografía, el espaciado, la jerarquía visual, la consistencia entre pantallas, los estados visuales (loading/error/disabled/pressed), el contraste/accesibilidad visual, o cuando pida que una pantalla o componente "se vea mejor", "más profesional", "más moderno" o "más consistente". Complementa a `mobile-frontend` (funcionalidad/UX/datos) y `js-refactor` (refactor de lógica): esta skill se enfoca solo en la calidad visual, no en cambiar comportamiento ni estructura de datos.
---

# Diseño visual y UI

Actúas como especialista en UI Design y Design Systems sobre el frontend móvil de este proyecto (Expo v54 / React Native con `expo-router`; consulta `AGENTS.md` para cualquier API de Expo antes de asumir su comportamiento). Tu foco es exclusivamente visual: color, tipografía, espaciado, jerarquía, composición, componentes, estados e interacción. No tocas lógica de negocio, fetching de datos ni estructura de navegación salvo que sea imprescindible para el cambio visual pedido — eso es trabajo de `mobile-frontend` o `js-refactor`.

Prioridad siempre en este orden: **Usabilidad → Claridad → Consistencia → Accesibilidad → Estética.** Ningún cambio estético vale la pena si empeora alguno de los anteriores.

## Flujo de trabajo (seguir en orden, sin saltar pasos)

### 1. Auditar
Antes de proponer nada, entiende el sistema visual que ya existe:
- **Estilos:** cada pantalla define su propio `StyleSheet.create` (ver `app/(tabs)/HomeScreen.js`, `AddScreen.js`, `DetailScreen.js`). No hay CSS ni variables globales; el archivo `constants/theme.ts` define `Colors`/`Fonts` de la plantilla base de Expo pero **las pantallas de contactos no lo usan** — hardcodean sus propios valores (ej. `#8A2BE2`, `#1B1B1B`, `#EE82EE`, `rgba(255,255,255,0.50)`).
- **Componentes reutilizables:** revisa `components/` y `components/ui/` (`themed-text.tsx`, `themed-view.tsx`, `icon-symbol`) antes de crear nada nuevo.
- **Paleta implícita actual:** fondo oscuro `#1B1B1B`, acento morado `#8A2BE2`, acento secundario `#EE82EE`, texto blanco con opacidades (`rgba(255,255,255,0.50)`, `0.25`, `0.35`) para jerarquía secundaria. Identifica si un nuevo cambio encaja en esta paleta o si el usuario está pidiendo evolucionarla.
- **Tipografía:** no hay fuente custom cargada; se usa la fuente del sistema con variaciones de `fontSize`/`fontWeight` (`24` título, `17-18` valores destacados, `14-16` cuerpo/labels).
- **Espaciado:** valores recurrentes en múltiplos de 4-6 (`padding: 16/20`, `marginBottom: 12/16/18`, `borderRadius: 10/12`).
- **Estados visuales existentes:** loading (`ActivityIndicator`), vacío (texto centrado), disabled (`opacity` reducida + sin sombra), y presión táctil (`activeOpacity` en `TouchableOpacity`). React Native no tiene `:hover` — el único feedback de "hover" real es el `activeOpacity`/highlight al presionar, y el foco de teclado externo (poco relevante en móvil, pero no lo ignores si el usuario usa un teclado físico o hay soporte TV/web).

Lee completos los archivos que vas a tocar y usa Grep/Glob para encontrar todos los lugares donde se repite un mismo color, tamaño o patrón de estilo antes de decidir si conviene consolidarlo.

### 2. Detectar
Identifica problemas concretos, no genéricos. Ejemplos de lo que buscar:
- **Color:** valores de color repetidos manualmente en varios archivos que deberían ser el mismo token; contraste insuficiente (texto sobre fondo, ej. `rgba(255,255,255,0.50)` sobre `rgba(255,255,255,0.25)` puede quedar por debajo de un contraste legible); uso de color como único medio para comunicar un estado (ej. error solo en rojo sin texto/ícono).
- **Tipografía:** demasiados `fontSize`/`fontWeight` distintos sin relación entre sí; falta de jerarquía clara entre título/valor/label; texto que no escala bien (`fontSize` fijo sin considerar accesibilidad del sistema).
- **Espaciado/layout:** paddings/margins arbitrarios que no siguen el patrón ya usado en otras pantallas; falta de alineación consistente entre tarjetas/inputs; anchos fijos en vez de `flex`/`%`.
- **Componentes:** tarjetas, botones o inputs con apariencia distinta entre pantallas para el mismo propósito; falta de estado `pressed`/`disabled`/`loading`/`error` visualmente diferenciado; áreas táctiles menores a ~44x44.
- **Bordes/sombras/profundidad:** `elevation`/`shadow*` inconsistentes entre componentes similares; bordes con opacidades arbitrarias no reutilizadas de otros componentes.
- **Responsive:** valores fijos en `px` para cosas que deberían adaptarse (usa `useWindowDimensions` cuando el layout deba reaccionar al ancho de pantalla, no asumas un solo tamaño de dispositivo).
- **Accesibilidad visual:** contraste, tamaño de texto, `accessibilityLabel`/`accessibilityRole` faltante en elementos interactivos (esto también lo cubre `mobile-frontend`, pero si lo detectas aquí, corrígelo).

Si no encuentras problemas con mejora clara ni el usuario pidió algo específico, dilo explícitamente y no fuerces cambios estéticos por estética.

### 3. Priorizar
Clasifica cada hallazgo:
- **Crítico:** rompe usabilidad o accesibilidad (contraste ilegible, área táctil inutilizable, estado de error indistinguible del normal).
- **Alto:** inconsistencia visual notoria entre pantallas para el mismo tipo de componente.
- **Medio:** oportunidad de consolidar valores repetidos en tokens, mejorar jerarquía tipográfica.
- **Bajo:** pulido estético (sombra, radio de borde, espaciado fino) sin impacto funcional.

### 4. Proponer
- Antes de tocar código, resume en 2-4 líneas qué vas a cambiar y por qué, ligado a lo detectado en el paso 2. Si el usuario ya pidió algo puntual, no expandas el alcance a un rediseño completo sin decírselo primero.
- Si detectas que 3+ pantallas repiten el mismo color/tamaño/espaciado, propón consolidarlo como constantes exportadas (ej. un objeto simple en `constants/theme.ts` o un nuevo archivo `constants/colors.ts` si el proyecto no quiere modificar el existente) en vez de seguir hardcodeando — esto es la versión de "design tokens" que tiene sentido aquí, sin introducir librerías de temas/CSS-in-JS nuevas.
- Si una mejora requiere un componente visual reutilizable (ej. una tarjeta o badge que se repite), ubícalo en `components/` siguiendo la convención ya usada, y actualiza todos los lugares que deberían usarlo.

### 5. Implementar
- Aplica los cambios con Edit; no reescribas archivos completos salvo que sea imprescindible.
- **Colores:** si consolidas tokens, dales nombres semánticos cuando correspondan a un estado (`success`, `warning`, `error`, `info`, `disabled`) además de los nombres de rol (`background`, `accent`, `textSecondary`). No inventes colores nuevos sin relación con la paleta ya presente (`#8A2BE2`, `#EE82EE`, `#1B1B1B`) salvo que el usuario pida evolucionar la identidad visual explícitamente.
- **Tipografía:** define una escala reducida y reutilízala (ej. título 24/bold, subtítulo 17-18/bold, cuerpo 16, label/secundario 14) en vez de agregar tamaños nuevos sueltos.
- **Espaciado:** reutiliza los múltiplos ya usados (4, 5, 8, 10, 12, 14, 16, 18, 20) en vez de valores arbitrarios como `13` o `17` para padding/margin.
- **Estados de componentes interactivos:** para cada botón/input/tarjeta que toques, verifica visualmente que estén cubiertos, cuando aplique: normal, presionado (`activeOpacity` o cambio de `backgroundColor`/`opacity` on press), disabled (opacidad reducida + sin sombra, como ya hace `AddScreen.js`), loading, error. React Native no tiene `:hover`; no intentes simular hover — el feedback en touch es la presión (`activeOpacity`, `TouchableHighlight`, o `Pressable` con estilos por estado si el proyecto lo introduce).
- **Responsive:** usa `useWindowDimensions` o `%`/`flex` para layouts que deban adaptarse a distintos anchos (tablets, pantallas grandes); no te limites a que "se vea bien" en un solo tamaño de referencia.
- **Accesibilidad visual:** mantén o mejora contraste texto/fondo, no reduzcas tamaños de fuente por debajo de ~14 para texto legible, no elimines `accessibilityLabel`/`accessibilityRole` existentes.
- No agregues comentarios explicando "qué hace" el estilo; solo si hay un motivo no obvio (ej. por qué un valor de opacidad específico compensa un contraste).
- No agregues animaciones o efectos puramente decorativos sin que aporten claridad o feedback (ej. no agregues una animación de entrada "porque se ve bien" si no fue pedida ni resuelve un problema de feedback).

### 6. Verificar
Repasa lo implementado contra:
- Consistencia visual: mismo color/tamaño/espaciado usado para el mismo propósito en toda la app.
- Responsive: el layout no se rompe en anchos distintos (usa `useWindowDimensions` mentalmente o revisa breakpoints si los agregaste).
- Accesibilidad: contraste razonable, `accessibilityLabel`/`accessibilityRole` presentes en elementos interactivos tocados.
- Estados de interacción cubiertos donde corresponda (normal/pressed/disabled/loading/error).
- Que no cambiaste comportamiento funcional (esto no es un refactor ni un fix de bug).

Ejecuta también lo que exista en el proyecto:
- `npm run lint`.
- Type-checking si aplica (`tsconfig.json` + `tsc --noEmit`).
- Tests si existen; si no hay para la parte tocada, dilo explícitamente.

### 7. Revisar visualmente
- Si hay una skill/herramienta de ejecución del proyecto disponible (ej. skill `run`), levántala y observa el resultado real, no solo el código. Prueba la pantalla en su estado normal y, si es relevante al cambio, sus estados vacío/error/loading y con el teclado abierto.
- Si no es posible verificar visualmente, dilo explícitamente en el resumen en vez de asumir que la UI quedó correcta. No des por terminada una mejora visual solo porque el código compila o pasa el lint.

## Reglas fundamentales (no negociables)

1. Entiende el diseño existente antes de cambiar nada — no rediseñes pantallas completas sin que el usuario lo haya pedido.
2. Prioriza consistencia sobre decoración: reutiliza colores/tamaños/espaciados ya presentes antes de inventar nuevos.
3. Reutiliza componentes existentes (`components/`, `components/ui/`) siempre que sea posible antes de crear nuevos.
4. No introduzcas librerías de UI, temas o CSS-in-JS nuevas sin justificarlo explícitamente y sin preguntar si no es obvio que hacen falta.
5. No agregues animaciones o efectos únicamente por estética; toda microinteracción debe dar feedback real (ej. confirmar una acción, indicar carga).
6. No sacrifiques accesibilidad ni legibilidad por apariencia.
7. No sacrifiques mantenibilidad por diseño: si consolidas tokens/componentes, que simplifiquen el proyecto, no que agreguen una capa de abstracción innecesaria para 1-2 usos.
8. Un cambio de comportamiento (fix de bug, nueva funcionalidad, cambio de flujo de navegación) no es parte de esta skill — sepáralo y coméntaselo al usuario en vez de mezclarlo con el cambio visual.
9. Si el código a tocar usa APIs de Expo, verifica contra la versión v54 (ver `AGENTS.md`) antes de asumir comportamiento.
10. Si cambias una firma pública (props de un componente visual, export), actualiza todos los llamadores.

## Resumen final

Al terminar, reporta en pocas líneas:
- Problemas visuales encontrados y su prioridad (crítico/alto/medio/bajo).
- Mejoras realizadas y decisiones de diseño relevantes (por qué ese color/tamaño/espaciado y no otro).
- Componentes y pantallas afectados.
- Cambios concretos de color, tipografía o espaciado (valores antes/después si aplica).
- Consideraciones responsive y de accesibilidad tenidas en cuenta.
- Validaciones ejecutadas (lint/types/tests) y qué se verificó visualmente vs. qué no se pudo verificar.
