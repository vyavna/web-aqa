import { test, expect } from "../fixtures/fixture-pages";
import { url, password, userName } from "../consts";

const invalidWithoutAtUserName = "test.com";
const invalidUserName = "test@example.com";
const invalidPassword = "Start123";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.page.goto(url);
  await loginPage.isOpened();
});

test.describe("Verify posisive scenarios for log in", () => {
  test("valid log in", async ({ loginPage, convertFilePage }) => {
    await loginPage.enterCredentials(userName, password);
    await convertFilePage.isOpened();
  });
});

test.describe("Verify negative scenarios for log in", () => {
  const ERROR_MESSAGES = [
    "Email or password is incorrect",
    "This is an invalid password for this email",
    'Provided password is for the user "user25@example.com". Use another one.',
    "Oh, no! :(",
  ];
  const errorMessageForEmptyCredentials = ["No empty fields allowed!"];

  test("test log in with invalid credentials @bug", async ({
    loginPage,
    alertHelper,
  }) => {
    await loginPage.enterCredentials(invalidUserName, invalidPassword);
    await alertHelper.chekErrorMessage(ERROR_MESSAGES);
  });

  test("test log in with empty credentials", async ({
    loginPage,
    alertHelper,
  }) => {
    await loginPage.enterCredentials("", "");
    await alertHelper.chekErrorMessage(errorMessageForEmptyCredentials);
  });

  test("test log in with invalid username", async ({ loginPage }) => {
    await loginPage.enterCredentials(invalidWithoutAtUserName, "");
    await loginPage.verifyEmailFielsIsInvalid();
  });

  test("test log in with invalid password @bug", async ({
    loginPage,
    alertHelper,
  }) => {
    await loginPage.enterCredentials(userName, invalidPassword);
    await expect(loginPage.passwordInput).toHaveText("");
    await alertHelper.chekErrorMessage(ERROR_MESSAGES);
  });
});
