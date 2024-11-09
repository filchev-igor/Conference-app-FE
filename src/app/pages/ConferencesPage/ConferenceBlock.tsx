import { ConferenceType } from "../../types/conferenceType.ts";
import { ReactElement, useCallback } from "react";
import useUserRoleContext from "../../hooks/useUserRoleContext.ts";
import useUserConferencesContext from "../../hooks/useUserConferencesContext.ts";

const ConferenceBlock = ({
  conference,
  children,
}: {
  conference: ConferenceType;
  children: ReactElement | null;
}) => {
  const { hasUserRole } = useUserRoleContext();
  const { userConferences } = useUserConferencesContext();

  const isUserRegistered = useCallback(() => {
    if (!hasUserRole) {
      return false;
    }

    userConferences.some(({ id }) => id === conference.id);
  }, [userConferences, conference, hasUserRole]);

  return (
    <div className={"sm:col-span-2 mb-5"}>
      <h3>
        <strong>Conference name:</strong>
        <span> {conference.name}</span>
      </h3>

      <div>
        <strong>Date:</strong>
        <span>
          {" "}
          {new Date(conference.date).toLocaleDateString("ru-RU", {
            timeZone: "UTC",
          })}
        </span>
      </div>

      <div>
        <strong>Time:</strong>
        <span> {conference.time}</span>
      </div>

      <div>
        <strong>Location:</strong>
        <span>
          {" "}
          {Object.values(conference.location).reduce(
            (acc, value) => acc + ", " + value,
          )}
        </span>
      </div>

      <div>
        <strong>Description:</strong>
        <span> {conference.description}</span>
      </div>

      <div>
        <strong>Speakers:</strong>
        <ul className={"list-disc list-inside"}>
          {conference.speakers.map((speaker) => (
            <li key={speaker.name}>
              {Object.values(speaker).reduce(
                (acc, value) => acc + ", " + value,
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Agenda:</strong>
        <ul className={"list-disc list-inside"}>
          {conference.agendas.map((agenda) => (
            <li key={agenda.event}>
              {Object.values(agenda).reduce((acc, value) => acc + ": " + value)}
            </li>
          ))}
        </ul>
      </div>

      {!isUserRegistered && (
        <div>
          <strong>Registration:</strong>
          <span>
            Please register in advance to secure your spot. Limited seats are
            available
          </span>
        </div>
      )}

      {children}
    </div>
  );
};

export default ConferenceBlock;
