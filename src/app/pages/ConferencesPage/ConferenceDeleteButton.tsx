import LoadingSpinner from "../../components/spinners/LoadingSpinner.tsx";
import useUserContext from "../../hooks/useUserContext.ts";

const ConferenceDeleteButton = ({
  onClick,
  isDeleting,
}: {
  onClick: () => void;
  isDeleting: boolean;
}) => {
  const { hasAdminRole } = useUserContext();

  if (!hasAdminRole) {
    return null;
  }

  return (
    <div>
      <button
        type={"button"}
        onClick={onClick}
        className={"bg-red-300 hover:bg-red-600 transition mt-3"}
      >
        {!isDeleting ? (
          "Delete conference"
        ) : (
          <div className={"flex"}>
            <LoadingSpinner /> Deleting the conference
          </div>
        )}
      </button>
    </div>
  );
};

export default ConferenceDeleteButton;
