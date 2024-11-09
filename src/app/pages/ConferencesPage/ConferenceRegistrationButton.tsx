import useUserConferencesContext from "../../hooks/useUserConferencesContext.ts";
import useUserContext from "../../hooks/useUserContext.ts";
import { ConferenceType } from "../../types/conferenceType.ts";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

const ConferenceRegistrationButton = ({
  conference,
}: {
  conference: ConferenceType;
}) => {
  const { userConferences, handleUserConferencesChange } =
    useUserConferencesContext();
  const { hasUserRole } = useUserContext();

  const [hasComment, setHasComment] = useState(false);

  const isUserRegistered = userConferences.some(
    ({ id }) => id === conference.id,
  );

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    setHasComment(!!value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const comment = (event.target as HTMLFormElement).comment.value;

    toast.success(`Your comment "${comment}" was saved`);

    handleUserConferencesChange(conference);
  };

  if (isUserRegistered || !hasUserRole) {
    return null;
  }

  return (
    <div
      className={
        "mt-5 w-full sm:w-96 sm:text-end border-2 border-purple-400 hover:border-purple-600 rounded-lg bg-white px-4 py-2"
      }
    >
      <form onSubmit={handleFormSubmit}>
        <textarea
          rows={3}
          placeholder={"Add your comment"}
          className={"w-full h-24 border-0 resize-none outline-0"}
          name={"comment"}
          onChange={handleCommentChange}
        ></textarea>

        <button
          type="submit"
          className={`${hasComment ? "animate-bounce" : ""} from-purple-500 to-pink-500 bg-gradient-to-r hover:bg-gradient-to-l mt-3 w-full sm:w-fit`}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default ConferenceRegistrationButton;
