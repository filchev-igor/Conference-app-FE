import Navbar from "../Navbar/Navbar.tsx";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "./styles.css";
import { useUser } from "../../api/users/queryHooks.ts";
import { BACKGROUND_CLASS_NAMES } from "../../constants/siteStyles.ts";
import { getDashedText } from "../../utils/text.ts";

const PageLayout = () => {
  const { userData, isUserDataLoading } = useUser();

  useEffect(() => {
    const bodyTag = document.querySelector("body");

    if (!bodyTag) {
      return;
    }

    const { 0: bodyClassName } = bodyTag.classList;
    const defaultBackgroundClassName = getDashedText(
      BACKGROUND_CLASS_NAMES.LINED_PAPER,
    );

    bodyTag.classList.remove(bodyClassName);
    bodyTag.classList.add(
      userData?.backgroundClassName ?? defaultBackgroundClassName,
    );
  }, [userData?.backgroundClassName]);

  return (
    <>
      <Navbar userRole={userData?.role} />

      <Toaster position="bottom-left" reverseOrder={false} />

      <main className={`pt-10 pr-10 pl-28 pb-5`}>
        <Outlet
          context={{
            userData,
            isUserDataLoading,
          }}
        />
      </main>
    </>
  );
};

export default PageLayout;
