// Pasos del login. Partieron del esqueleto generado por el Generador de casos Gherkin
// (todos pendientes) y se implementaron con los Page Objects de pages/.
import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

Given('que el cliente está en la página de inicio de sesión', async ({ loginPage }) => {
  await loginPage.abrir();
});

When('inicia sesión con usuario {string} y contraseña {string}',
  async ({ loginPage }, usuario: string, contrasena: string) => {
    await loginPage.iniciarSesion(usuario, contrasena);
  });

When('inicia sesión con usuario vacío y contraseña {string}', async ({ loginPage }, contrasena: string) => {
  await loginPage.iniciarSesion('', contrasena);
});

// Paso agregado a mano: responde una pregunta abierta que dejó la herramienta.
When('inicia sesión con usuario {string} y contraseña vacía', async ({ loginPage }, usuario: string) => {
  await loginPage.iniciarSesion(usuario, '');
});

Then('ve la página {string}', async ({ inventoryPage }, titulo: string) => {
  await expect(inventoryPage.titulo).toHaveText(titulo);
});

Then('ve el catálogo de productos', async ({ inventoryPage }) => {
  await expect(inventoryPage.productos.first()).toBeVisible();
});

Then('ve el mensaje {string}', async ({ loginPage }, mensaje: string) => {
  await expect(loginPage.mensajeError).toHaveText(mensaje);
});

Then('no ingresa a la tienda', async ({ page, loginPage }) => {
  // Sigue en la pantalla de login: el botón está y la dirección no es la del catálogo.
  await expect(loginPage.botonIngresar).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
});
