import { test, expect } from "../fixtures/fixture-pages";
import { url, filesPath, password, userName, validFileName } from "../consts";

test.beforeEach(async ({ loginPage, convertFilePage }) => {
  await loginPage.page.goto(url);
  await loginPage.isOpened();

  await loginPage.enterCredentials(userName, password);
  await convertFilePage.isOpened();
});

test.describe("Verify posisive scenarios for log out", () => {
  test("valid log out", async ({ loginPage, headerNavigationBar }) => {
    await expect(headerNavigationBar.logoutButton).toBeVisible();
    await expect(headerNavigationBar.logoButton).toBeVisible();

    await headerNavigationBar.logOut();
    await loginPage.isOpened();

    await expect(headerNavigationBar.logoutButton).not.toBeVisible();
  });

  test("verify after log out history is still shown", async ({
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
    await expect(headerNavigationBar.logoutButton).toBeVisible();
  });
});
