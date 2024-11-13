import { ConferenceType } from "../../types/conferenceType.ts";

const ConferenceParticipants = ({
  conference,
}: {
  conference: ConferenceType;
}) => {
  if (!conference.participants.length) {
    return null;
  }

  return (
    <div>
      <strong>List of participants:</strong>
      <ul className={"list-disc list-inside"}>
        {conference.participants.map(({ name }) => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConferenceParticipants;
