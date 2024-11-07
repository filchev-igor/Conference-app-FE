import ConferenceBlock from "./ConferenceBlock.tsx";
import { useState } from "react";
import { ConferenceType } from "../../types/conferenceType.ts";
import { isEmpty } from "lodash";
import ConferenceRegistrationButton from "./ConferenceRegistrationButton.tsx";
import ConferenceParticipants from "./ConferenceParticipants.tsx";
import CreateConferenceButton from "./CreateConferenceButton.tsx";
import UserConferencesList from "./UserConferencesList.tsx";
import ConferencesList from "./ConferencesList.tsx";

const ConferencesPage = () => {
  const [conferenceData, setConferenceData] = useState<ConferenceType | null>(
    null,
  );

  const handleConferenceDataChange = (conference: ConferenceType) => {
    if (!isEmpty(conferenceData) && conference.id === conferenceData.id) {
      setConferenceData(null);

      return;
    }

    setConferenceData(conference);
  };

  return (
    <div className={"grid sm:grid-cols-2 gap-5"}>
      <CreateConferenceButton />

      <UserConferencesList />

      <ConferencesList
        conferenceData={conferenceData}
        onClick={handleConferenceDataChange}
      />

      {!isEmpty(conferenceData) && (
        <ConferenceBlock conference={conferenceData}>
          <>
            <ConferenceRegistrationButton conference={conferenceData} />

            <ConferenceParticipants conferenceId={conferenceData.id ?? 0} />
          </>
        </ConferenceBlock>
      )}
    </div>
  );
};

export default ConferencesPage;
