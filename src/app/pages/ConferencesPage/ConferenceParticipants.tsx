import useUserRoleContext from "../../hooks/useUserRoleContext.ts";
import useUserConferencesContext from "../../hooks/useUserConferencesContext.ts";

const ConferenceParticipants = ({ conferenceId }: { conferenceId: number }) => {
  const { hasUserRole } = useUserRoleContext();
  const { userConferences } = useUserConferencesContext();

  if (hasUserRole) {
    return null;
  }

  if (userConferences.some(({ id }) => id === conferenceId)) {
    return (
      <div>
        <strong>List of participants:</strong>
        <ul className={"list-disc list-inside"}>
          <li>Me</li>
        </ul>
      </div>
    );
  }

  return null;
};

export default ConferenceParticipants;
