# Tests BDD de saucedemo con Playwright y Page Objects

[![Tests](https://github.com/Gikza/saucedemo-playwright-bdd/actions/workflows/tests.yml/badge.svg)](https://github.com/Gikza/saucedemo-playwright-bdd/actions/workflows/tests.yml)

Tests automatizados del inicio de sesión de [saucedemo.com](https://www.saucedemo.com) (Swag Labs), escritos en **Gherkin** y ejecutados con **Playwright + playwright-bdd**, con el patrón **Page Object**.

## Cómo se hizo

Este proyecto muestra el recorrido completo, de una historia de usuario a tests en verde:

1. **Historia de usuario** con los criterios de aceptación del login.
2. **Casos en Gherkin** generados con mi [Generador de casos Gherkin con IA](https://github.com/Gikza/gherkin-generator-ai), que valida lo que produce la IA y deja como *pregunta abierta* lo que la historia no define, en lugar de inventarlo.
3. **Esqueleto Playwright** generado por la misma herramienta: un paso por definición, todos pendientes y **sin selectores**, porque sin ver la página real serían inventados.
4. **Implementación manual** de los pasos con Page Objects, usando los atributos `data-test` de la página real.

## Qué aporté a mano

- **Page Objects** (`pages/`): cómo se encuentran los elementos y cómo se inicia sesión, en un solo lugar.
- **Fixtures** (`steps/fixtures.ts`): cada paso recibe los Page Objects ya creados.
- **Implementación de los pasos** (`steps/login.steps.ts`).
- **Una pregunta abierta respondida**: la herramienta preguntó qué pasa con la contraseña vacía. Lo verifiqué contra la app real y lo sumé como escenario.
- **Comprobé que los tests pueden fallar**: cambié a propósito el título esperado y falló solo el test correspondiente.

## Escenarios (8 tests)

| Escenario | Qué verifica |
|---|---|
| Credenciales válidas | Llega a "Products" y ve el catálogo |
| Usuario bloqueado | Mensaje de bloqueo y no ingresa |
| Contraseña incorrecta (3 ejemplos) | Mensaje de credenciales inválidas y no ingresa |
| Usuario vacío | "Username is required" y no ingresa |
| Contraseña vacía | "Password is required" y no ingresa |
| Usuario solo con espacios | No ingresa |

## Estructura

```
features/login.feature     Casos en Gherkin
pages/LoginPage.ts         Page Object del login
pages/InventoryPage.ts     Page Object del catálogo
steps/fixtures.ts          Entrega los Page Objects a los pasos
steps/login.steps.ts       Implementación de los pasos
playwright.config.ts       Configuración (baseURL, data-test, navegador)
```

## Cómo ejecutarlo

```bash
npm install
npm test
```

`npm test` convierte los `.feature` en tests (`bddgen`) y los ejecuta. En la computadora usa el Google Chrome instalado; en GitHub Actions, el Chromium de Playwright. Para probar otra dirección, definir `BASE_URL`.

## Stack

Playwright · TypeScript · playwright-bdd · Gherkin/BDD · Page Object Model · GitHub Actions
