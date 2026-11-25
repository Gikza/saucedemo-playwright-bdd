import type { Locator, Page } from '@playwright/test';

/**
 * Page Object de la pantalla de inicio de sesión de saucedemo.
 * Guarda en un solo lugar CÓMO se encuentran los elementos y CÓMO se inicia sesión:
 * si la página cambia, se corrige acá y no en cada paso.
 */
export class LoginPage {
  readonly usuario: Locator;
  readonly contrasena: Locator;
  readonly botonIngresar: Locator;
  readonly mensajeError: Locator;

  constructor(private readonly page: Page) {
    // saucedemo marca sus elementos con el atributo data-test (ver testIdAttribute en la config).
    this.usuario = page.getByTestId('username');
    this.contrasena = page.getByTestId('password');
    this.botonIngresar = page.getByTestId('login-button');
    this.mensajeError = page.getByTestId('error');
  }

  async abrir() {
    await this.page.goto('/');
  }

  async iniciarSesion(usuario: string, contrasena: string) {
    await this.usuario.fill(usuario);
    await this.contrasena.fill(contrasena);
    await this.botonIngresar.click();
  }
}
