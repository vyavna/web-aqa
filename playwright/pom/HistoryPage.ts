import { Page, expect, Locator } from "@playwright/test";

export class HistoryPage {
  page = this._page;
  historyTitle = this.page.getByText("Items History");
  historyItemArea = this.page.getByTestId("area-file");

  constructor(protected _page: Page) {}

  async isOpened() {
    await expect(this.historyTitle).toBeVisible();
  }

  async fileIsShown(fileName: string) {
    await expect(this.page.getByText(fileName)).toBeVisible();
  }
  async fileIsNotShown(fileName: string) {
    await expect(this.page.getByText(fileName)).not.toBeVisible();
  }
  async removeFile(fileName: string) {
    await this.historyItemArea.hover();
    await this.page.getByTestId(`close_${fileName}`).click();
  }
}
