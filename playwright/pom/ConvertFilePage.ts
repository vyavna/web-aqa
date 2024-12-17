import { Download, Page, expect, Locator } from "@playwright/test";
import fs from "fs";
import { url } from "../consts";

export class ConvertFilePage {
  page = this._page;
  convertButton = this.page.getByText("Convert PDF file");
  closeButton = this.page.locator('[class="btn btn-square btn-sm"]');
  downloadFileButton = this.page.getByText("Download DOCX file");
  successBanner = this.page.locator('[class="alert alert-success"]');
  historyLinkText = this.page.getByText(
    "Go to upload history, files uploaded:"
  );
  historyLink = this.page.locator('[href="/history"]');

  constructor(protected _page: Page) {}

  async isOpened() {
    await this.page.getByText("Drag 'n' drop PDF files here").isVisible();
  }

  async uploadFile(filePath: string) {
    await this.page.setInputFiles('[type="file"]', filePath);
  }

  async clickOnConvert() {
    await this.convertButton.click();
  }

  async verifyFileNameIsVisible(fileName: string) {
    await expect(this.page.getByText(fileName)).toBeVisible();
  }

  async isDownloadDocxButtonVisible() {
    return await this.downloadFileButton.isVisible();
  }

  async clickOnDownloadDocxButton() {
    await this.downloadFileButton.click();
  }

  async verifyFileIsConverted() {
    await expect(this.successBanner).toHaveText(
      "File converted successfully!",
      {
        timeout: 11000,
      }
    );
  }

  async verifyHistoryLinkIsVisible() {
    await expect(this.historyLinkText).toBeVisible({timeout:6000});
  }

  async goToHistory() {
    await this.historyLink.click();
  }

  async downloadAFile(filePath: string) {
    if (await this.isDownloadDocxButtonVisible()) {
      const downloadPromise = this.page.waitForEvent("download");
      const status = await this.checkNetworkRequest(() =>
        this.clickOnDownloadDocxButton()
      );
      await expect(status).toBe(200);

      //await this.clickOnDownloadDocxButton();

      const downloadFile = await downloadPromise;
      // Wait for the download process to complete and save the downloaded file somewhere.
      await downloadFile.saveAs(filePath + downloadFile.suggestedFilename());
      return downloadFile;
    }
  }

  async checkNetworkRequest(action: () => Promise<unknown>) {
    const requestPromise = this.page.waitForRequest(
      url + "api/docs/converted-file.docx",
      { timeout: 30000 }
    );

    await action();

    const request = await requestPromise;
    const response = await request.response();
    const status = await response?.status();
    return status;
  }

  async verifyFileSize(downloadFile: Download) {
    // assert filename
    expect(downloadFile.suggestedFilename()).toBe("converted-file.docx");
    // get and assert stats
    const sizeFile = (
      await fs.promises.stat((await downloadFile.path()) as string)
    ).size;
    expect(sizeFile).toBeGreaterThan(100);
  }

  async verifyCloseButtonIsVisible() {
    await expect(this.closeButton).toBeVisible();
  }

  async clickOnCloseButton() {
    await this.closeButton.click();
  }

  async verifyFileIsShownInHistory(fileName: string) {}
}
