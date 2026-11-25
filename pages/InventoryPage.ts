import type { Locator, Page } from '@playwright/test';

/** Page Object del catálogo de productos ("Products"), al que se llega después del login. */
export class InventoryPage {
  readonly titulo: Locator;
  readonly productos: Locator;

  constructor(page: Page) {
    this.titulo = page.getByTestId('title');
    this.productos = page.getByTestId('inventory-item');
  }
}
