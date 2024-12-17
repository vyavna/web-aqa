import { test, expect } from "../fixtures/fixture-pages";
import { url, filesPath, password, userName, validFileName } from "../consts";

test.beforeEach(async ({ loginPage, convertFilePage }) => {
  await loginPage.page.goto(url);
  await loginPage.isOpened();

  await loginPage.enterCredentials(userName, password);
  await convertFilePage.isOpened();
});

test("verify file is shown in the history ", async ({
  loginPage,
  headerNavigationBar,
  convertFilePage,
  historyPage,
}) => {
  await convertFilePage.uploadFile(filesPath + validFileName);
  await convertFilePage.goToHistory();
  await historyPage.isOpened();
  await historyPage.fileIsShown(validFileName);
  await headerNavigationBar.logOut();
  await expect(headerNavigationBar.logoutButton).not.toBeVisible();

  await loginPage.enterCredentials(userName, password);
  await convertFilePage.goToHistory();
  await historyPage.isOpened();
  await historyPage.fileIsShown(validFileName);
  await historyPage.removeFile(validFileName);
  await historyPage.fileIsNotShown(validFileName);
});
