import ConferenceBlock from "./ConferenceBlock.tsx";
import { useState } from "react";
import { ConferenceType } from "../../types/conferenceType.ts";
import { isEmpty } from "lodash";
import ConferenceRegistrationButton from "./ConferenceRegistrationButton.tsx";
import ConferenceParticipants from "./ConferenceParticipants.tsx";
import CreateConferenceButton from "./CreateConferenceButton.tsx";
import UserConferencesList from "./UserConferencesList.tsx";
import ConferencesList from "./ConferencesList.tsx";
import { useConferenceDelete } from "../../api/conferences/queryHooks.ts";
import ConferenceDeleteButton from "./ConferenceDeleteButton.tsx";

const ConferencesPage = () => {
  const { isConferenceDeleting, mutateConferenceDelete } =
    useConferenceDelete();

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

  const handleConferenceDelete = () => {
    if (isConferenceDeleting) {
      return;
    }

    const isConfirmed = confirm("Do you want to delete this conference?");

    if (!isConfirmed) {
      return;
    }

    mutateConferenceDelete({
      conferenceId: conferenceData?.id ?? 0,
      onSuccess: () => {
        setConferenceData(null);
      },
    });
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
        <ConferenceBlock
          conference={conferenceData}
          conferenceDeleteButton={
            <ConferenceDeleteButton
              onClick={handleConferenceDelete}
              isDeleting={isConferenceDeleting}
            />
          }
        >
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
