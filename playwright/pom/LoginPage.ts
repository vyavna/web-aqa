import { Page, expect } from "@playwright/test";

export class LoginPage {
  page = this._page;
  signInButton = this.page.getByText("Sign in");
  emailInput = this.page.getByPlaceholder("Email");
  passwordInput = this.page.getByPlaceholder("Enter a password");

  constructor(protected _page: Page) {}

  async isOpened() {
    await expect(this.signInButton).toBeVisible();
  }

  async enterCredentials(userName: string, password: string) {
    await this.emailInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async verifyEmailFielsIsInvalid() {
    //verify pseudo class in CSS selectors for HTML validation attr
    await expect(this.page.locator('[type="email"]:invalid')).toBeVisible();
  }
}
