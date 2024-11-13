import useUserContext from "../../hooks/useUserContext.ts";
import toast from "react-hot-toast";
import { useConferenceParticipantsUpdate } from "../../api/conferences/queryHooks.ts";
import LoadingSpinner from "../../components/spinners/LoadingSpinner.tsx";

const ConferenceRegistrationButton = ({
  conferenceId,
}: {
  conferenceId: number;
}) => {
  const { userData } = useUserContext();

  const {
    mutateConferenceParticipantsUpdate,
    isConferenceParticipantsUpdating,
  } = useConferenceParticipantsUpdate();

  const isUserRegistered = userData.conferences?.some(
    ({ id }) => id === conferenceId,
  );

  const handleRegistrationButtonClick = () => {
    mutateConferenceParticipantsUpdate({
      conferenceId,
      onSuccess: () => {
        toast.success(`You have been registered`);
      },
    });
  };

  return (
    <div>
      <button
        type="button"
        className={`from-purple-500 to-pink-500 bg-gradient-to-r hover:bg-gradient-to-l mt-3 w-full sm:w-fit`}
        onClick={handleRegistrationButtonClick}
      >
        {!isConferenceParticipantsUpdating ? (
          !isUserRegistered ? (
            "Register"
          ) : (
            "I shall not participate"
          )
        ) : (
          <div className={"flex"}>
            <LoadingSpinner />{" "}
            {!isUserRegistered ? "Registering" : "Removing your registration"}
          </div>
        )}
      </button>
    </div>
  );
};

export default ConferenceRegistrationButton;
