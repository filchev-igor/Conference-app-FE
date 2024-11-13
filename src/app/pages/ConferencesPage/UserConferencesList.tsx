import useUserContext from "../../hooks/useUserContext.ts";

const UserConferencesList = () => {
  const { hasUserRole, userData } = useUserContext();

  if (hasUserRole || !userData.conferences?.length) {
    return null;
  }

  return (
    <div className={"col-span-2"}>
      <strong>I shall participate in the next conferences:</strong>
      <ul className={"list-disc list-inside"}>
        {userData.conferences.map((conference) => (
          <li key={conference.id}>{conference.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserConferencesList;
