import { Page, expect, Locator } from "@playwright/test";

export class HeaderNavigationBar {
  page = this._page;
  logoutButton = this.page.getByText("Log out");
  logoButton = this.page.getByText("LOGO");

  constructor(protected _page: Page) {}

  async logoIsPresent() {
    await expect(this.logoButton).toBeVisible();
  }

  async logOut() {
    await this.logoutButton.click();
  }
}
