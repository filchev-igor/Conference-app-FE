import { generateRandomConference } from "../../utils/conference.ts";
import LoadingSpinner from "../../components/spinners/LoadingSpinner.tsx";
import { useConferenceCreate } from "../../api/conferences/queryHooks.ts";
import useUserContext from "../../hooks/useUserContext.ts";

const CreateConferenceButton = () => {
  const { hasAdminRole } = useUserContext();
  const { mutateConferenceCreate, isConferenceCreating } =
    useConferenceCreate();

  const handleConferenceCreate = () => {
    if (isConferenceCreating) {
      return;
    }

    const data = generateRandomConference();

    mutateConferenceCreate({ data, onSuccess: () => {} });
  };

  if (!hasAdminRole) {
    return null;
  }

  return (
    <div className={"sm:col-span-2 text-center w-full sm:w-fit"}>
      <button
        type={"button"}
        className={`flex from-cyan-500 to-blue-500 bg-gradient-to-b w-full sm:w-fit ${isConferenceCreating ? "disabled" : ""}`}
        onClick={handleConferenceCreate}
      >
        {isConferenceCreating ? (
          <>
            <LoadingSpinner />
            Processing...
          </>
        ) : (
          "Create new conference"
        )}
      </button>{" "}
    </div>
  );
};

export default CreateConferenceButton;
