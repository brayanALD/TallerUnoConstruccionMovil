---
name: js-refactor
description: Refactoriza código JavaScript/JSX/TypeScript existente en este proyecto (Expo/React Native) sin cambiar su comportamiento. Úsala cuando el usuario pida "refactoriza", "limpia este código", "mejora la legibilidad/mantenibilidad", "elimina duplicación", "simplifica esta función/lógica", o pida revisar código antes de tocarlo por problemas de diseño, funciones muy largas, nombres poco claros o condicionales complejos.
---

# Refactorización de JavaScript

Refactorizas código JS/JSX/TS existente del proyecto (Expo v54 / React Native — respeta `AGENTS.md` para cualquier API de Expo) preservando el comportamiento funcional exacto. Prioriza simplicidad sobre sobreingeniería: si no hay una mejora clara, dilo y no toques el código.

## Flujo de trabajo (seguir en orden, sin saltar pasos)

### 1. Inspección
- Lee el/los archivo(s) objetivo completos, no solo el fragmento señalado.
- Busca con Grep/Glob dónde se importa y usa cada función/componente/módulo que vas a tocar (llamadas, props, exports).
- Identifica pruebas relacionadas (`*.test.js`, `*.spec.js`, carpetas `__tests__`) y config de lint/types (`eslint.config.js`, `tsconfig.json`).

### 2. Diagnóstico
Antes de cambiar nada, enumera problemas concretos encontrados, por ejemplo:
- Código duplicado o casi idéntico en varios lugares.
- Funciones/componentes largos que mezclan responsabilidades (ej. fetching + validación + render en un mismo bloque).
- Nombres de variables/funciones/componentes poco descriptivos.
- Condicionales anidados o lógica booleana difícil de seguir.
- Estado o efectos redundantes en componentes React.
- Uso de patrones obsoletos cuando el proyecto ya usa sintaxis moderna (destructuring, optional chaining, `??`, arrow functions, hooks) de forma consistente.

Para cada problema, explica brevemente *por qué* es un problema (no solo que "está mal").

Si no encuentras problemas con mejora clara, dilo explícitamente y detente aquí — no refactorices por refactorizar.

### 3. Plan
- Define los cambios mínimos necesarios para resolver cada problema del diagnóstico.
- Evita introducir abstracciones, patrones de diseño o dependencias nuevas que no estén justificadas por el problema real.
- Si el cambio es grande, divídelo en pasos pequeños y verificables.
- Respeta las convenciones ya usadas en el proyecto (estructura de carpetas `app/`, `components/`, `hooks/`, `constants/`, estilo de imports, uso de Firebase ya presente en el proyecto).

### 4. Implementación
- Aplica los cambios con Edit (no reescribas archivos completos salvo que sea imprescindible).
- Un cambio de comportamiento (fix de bug, nueva funcionalidad) NO es parte de esta skill salvo que el usuario lo pida explícitamente — sepáralo y coméntaselo al usuario en vez de mezclarlo.
- No agregues comentarios explicando "qué hace" el código; solo si hay un motivo no obvio (workaround, invariante oculta).

### 5. Validación
Ejecuta lo que exista en el proyecto, en este orden si aplica:
- `npm run lint` (o el script de ESLint configurado).
- Type-checking si hay `tsconfig.json` con `tsc --noEmit` o script equivalente.
- Tests (`npm test` u otro script) si existen.
- Si no hay tests automatizados para la parte tocada, dilo explícitamente en el resumen — no asumas que el comportamiento quedó verificado.

### 6. Revisión
- Compara mentalmente (o con `git diff`) la lógica antes/después: mismas entradas deben producir las mismas salidas.
- Verifica que todos los usos/imports del código modificado siguen siendo compatibles (nombres, firmas, tipos de retorno, props).
- Si algo requiere cambiar una firma pública (export, props de un componente), actualiza también todos los llamadores.

### 7. Resumen
Al terminar, reporta en pocas líneas:
- Qué se modificó y por qué (vínculo directo con el diagnóstico del paso 2).
- Qué validaciones se ejecutaron y su resultado (lint/types/tests, o su ausencia).
- Cualquier riesgo residual o parte que no se pudo verificar automáticamente.

## Reglas de seguridad (no negociables)

1. No cambies comportamiento funcional salvo petición explícita del usuario.
2. No introduzcas dependencias nuevas sin justificarlo y sin preguntar si no es obvio.
3. No apliques patrones de diseño o abstracciones "porque sí" — la simplicidad gana sobre la sobreingeniería.
4. Cambios pequeños y controlados: preferir varias ediciones acotadas a una reescritura masiva.
5. Si el código a refactorizar toca Expo/React Native APIs, verifica contra la versión v54 (ver `AGENTS.md`) antes de asumir comportamiento.
6. Si detectas que el "problema" reportado por el usuario en realidad requiere un fix de bug, no un refactor, dilo antes de proceder.
