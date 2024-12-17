import { test as base } from "@playwright/test";
import { LoginPage } from "../pom/LoginPage";
import { HeaderNavigationBar } from "../pom/HeaderNavigationBar";
import { ConvertFilePage } from "../pom/ConvertFilePage";
import { HistoryPage } from "../pom/HistoryPage";
import { AlertHelper } from "../pom/AlertHelper";

type Pages = {
  loginPage: LoginPage;
  headerNavigationBar: HeaderNavigationBar;
  convertFilePage: ConvertFilePage;
  historyPage: HistoryPage;
  alertHelper: AlertHelper;
};

export const test = base.extend<Pages>({
  loginPage: ({ page }, use) => {
    const loginPage = new LoginPage(page);
    use(loginPage);
  },

  headerNavigationBar: ({ page }, use) => {
    const headerNavigationBar = new HeaderNavigationBar(page);
    use(headerNavigationBar);
  },

  convertFilePage: ({ page }, use) => {
    const convertFilePage = new ConvertFilePage(page);
    use(convertFilePage);
  },

  historyPage: ({ page }, use) => {
    const historyPage = new HistoryPage(page);
    use(historyPage);
  },

  alertHelper: ({ page }, use) => {
    const alertHelper = new AlertHelper(page);
    use(alertHelper);
  },
});
export { expect } from "@playwright/test";
