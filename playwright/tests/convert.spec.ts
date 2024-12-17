import {
  url,
  filesPath,
  invalidFileName,
  password,
  userName,
  validFileName,
} from "../consts";
import { test, expect } from "./../fixtures/fixture-pages";

test.beforeEach(async ({ loginPage, convertFilePage }) => {
  await loginPage.page.goto(url);
  await loginPage.isOpened();

  await loginPage.enterCredentials(userName, password);
  await convertFilePage.isOpened();
});

test.describe("Verify uploading a file", () => {
  test("valid upload @bug", async ({ convertFilePage }) => {
    await convertFilePage.uploadFile(filesPath + validFileName);
    await convertFilePage.verifyFileNameIsVisible(validFileName);
    await convertFilePage.clickOnConvert();
    await convertFilePage.verifyFileIsConverted();
    expect(await convertFilePage.isDownloadDocxButtonVisible()).toBeTruthy();
  });

  test("verify download @bug", async ({ convertFilePage }) => {
    await convertFilePage.uploadFile(filesPath + validFileName);
    await convertFilePage.clickOnConvert();
    await convertFilePage.verifyFileIsConverted();
    await convertFilePage.verifyFileNameIsVisible(validFileName);
    const fileDownload = await convertFilePage.downloadAFile(filesPath);
    await convertFilePage.verifyFileSize(fileDownload!);
  });
});

test("upload a file of invalid format", async ({
  convertFilePage,
  alertHelper,
}) => {
  await convertFilePage.uploadFile(filesPath + invalidFileName);
  await convertFilePage.clickOnConvert();
  await expect(convertFilePage.convertButton).toBeDisabled();

  const ERROR_MESSAGES = [
    "File is too large",
    "File is empty",
    "File is corrupted",
    "Invalid file format",
    "No-no-no! PDF only!",
  ];
  await alertHelper.chekErrorMessage(ERROR_MESSAGES);
});

test("verify closing button navigation", async ({ convertFilePage }) => {
  await convertFilePage.uploadFile(filesPath + validFileName);
  await convertFilePage.verifyCloseButtonIsVisible();
  await convertFilePage.clickOnCloseButton();
  await convertFilePage.isOpened();

  await convertFilePage.uploadFile(filesPath + invalidFileName);
  await convertFilePage.clickOnConvert();
  await convertFilePage.clickOnCloseButton();
  await convertFilePage.isOpened();
});
