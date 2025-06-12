import { Page, Locator } from '@playwright/test';

export class SecureAreaPage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly flashMessage: Locator;
  readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator('a.button'); // Logout button
    this.flashMessage = page.locator('#flash');
    this.header = page.locator('h2'); // Secure Area header
  }

  async logout() {
    await this.logoutButton.click();
  }

  async getFlashMessage() {
    return this.flashMessage.textContent();
  }

  async getHeaderText() {
    return this.header.textContent();
  }

  async getPageTitle() {
    return this.page.title();
  }
} 