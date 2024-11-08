import { createBrowserRouter } from "react-router-dom";
import { PATH_NAMES } from "./constants.ts";
import PageLayout from "../../components/PageLayout/PageLayout.tsx";
import HomePage from "../../pages/HomePage/HomePage.tsx";
import ConferencesPage from "../../pages/ConferencesPage/ConferencesPage.tsx";
import UsersListPage from "../../pages/UsersListPage/UsersListPage.tsx";
import SettingsPage from "../../pages/Settings/SettingsPage.tsx";

export const router = createBrowserRouter(
  [
    {
      path: PATH_NAMES.homePage,
      element: <PageLayout />,
      children: [
        {
          path: PATH_NAMES.homePage,
          element: <HomePage />,
          index: true,
        },
        {
          path: PATH_NAMES.conferencesPage,
          element: <ConferencesPage />,
        },
        {
          path: PATH_NAMES.usersPage,
          element: <UsersListPage />,
        },
        {
          path: PATH_NAMES.settingsPage,
          element: <SettingsPage />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
