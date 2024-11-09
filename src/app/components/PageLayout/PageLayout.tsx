import Navbar from "../Navbar/Navbar.tsx";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConferenceType } from "../../types/conferenceType.ts";
import { Toaster } from "react-hot-toast";
import "./styles.css";
import { defaultBackgroundClassName } from "./styles.ts";
import { useUser } from "../../api/users/queryHooks.ts";

const PageLayout = () => {
  const { userData, isUserDataLoading } = useUser();

  const [userConferences, setUserConferences] = useState<ConferenceType[]>([]);
  const [conferencesList, setConferencesList] = useState<ConferenceType[]>([]);
  const [backgroundClassName, setBackgroundClassName] = useState(
    defaultBackgroundClassName,
  );

  const handleUserConferencesChange = (newConference: ConferenceType) => {
    const isUserParticipating = userConferences.some(
      ({ id }) => id === newConference.id,
    );

    const newUserConferences = isUserParticipating
      ? userConferences.filter(({ id }) => id !== newConference.id)
      : [...userConferences, newConference];

    setUserConferences(newUserConferences);
  };

  const handleConferenceListUpdate = (newConference: ConferenceType) => {
    setConferencesList([...conferencesList, newConference]);
  };

  useEffect(() => {
    const bodyTag = document.querySelector("body");

    if (!bodyTag) {
      return;
    }

    const { 0: bodyClassName } = bodyTag.classList;

    if (bodyClassName === backgroundClassName) {
      return;
    }

    bodyTag.classList.toggle(backgroundClassName);
  }, [backgroundClassName]);

  return (
    <>
      <Navbar userRole={userData?.role} />

      <Toaster position="bottom-left" reverseOrder={false} />

      <main className={`pt-10 pr-10 pl-28 pb-5`}>
        <Outlet
          context={{
            userData,
            isUserDataLoading,
            userConferences,
            handleUserConferencesChange,
            conferencesList,
            handleConferenceListUpdate,
            backgroundClassName,
            setBackgroundClassName,
          }}
        />
      </main>
    </>
  );
};

export default PageLayout;
