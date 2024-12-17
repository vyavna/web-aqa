import { Page, expect } from "@playwright/test";

export class AlertHelper {
  page = this._page;
  alertBanner = this.page.locator('[class="alert alert-error"]');

  constructor(protected _page: Page) {}

  async chekErrorMessage(errorMessages: Array<string>) {
    const errorText = await this.alertBanner.textContent();
    expect(errorMessages.some((e) => errorText == e)).toBeTruthy();
  }
}
