import { ConferenceType } from "../../types/conferenceType.ts";
import { isEmpty } from "lodash";
import { useConferencesList } from "../../api/conferences/queryHooks.ts";
import { useUser } from "../../api/users/queryHooks.ts";
import LoadingSpinner from "../../components/spinners/LoadingSpinner.tsx";

const ConferencesList = ({
  conferenceData,
  onClick,
}: {
  conferenceData: ConferenceType | null;
  onClick: (conference: ConferenceType) => void;
}) => {
  //move to upper component!!!
  const { hasAdminRole } = useUser();
  const { conferencesListData, isConferencesListDataLoading } =
    useConferencesList();

  if (isConferencesListDataLoading) {
    return <LoadingSpinner />;
  }

  if (isEmpty(conferencesListData)) {
    return (
      <span>
        {hasAdminRole ? "You" : "Administrator"} did not add any conference yet
      </span>
    );
  }

  return conferencesListData!.map((conference) => (
    <div key={conference.id} className={"grid gap-1"}>
      <div>
        <strong>Conference Title:</strong>
        <span> {conference.title}</span>
      </div>

      <div className={"w-full sm:w-fit"}>
        <button
          type={"button"}
          onClick={() => onClick(conference)}
          className={
            "bg-sky-500 w-full sm:w-fit hover:from-sky-300 hover:to-sky-700 hover:bg-gradient-to-r"
          }
        >
          {conferenceData?.id !== conference.id
            ? "Read more"
            : "Hide conference info"}
        </button>
      </div>
    </div>
  ));
};

export default ConferencesList;
