import { BACKGROUND_CLASS_NAMES } from "../../constants/siteStyles.ts";
import { capitalizeFirstLetter, getDashedText } from "../../utils/text.ts";
import "./styles.css";
import { useUserUpdate } from "../../api/users/queryHooks.ts";
import UseUserContext from "../../hooks/useUserContext.ts";

const SettingsPage = () => {
  const { userData } = UseUserContext();

  const { mutateUserUpdate, isUserUpdating } = useUserUpdate();

  const handleBackgroundClassNameChange = (newBackgroundClassName: string) => {
    if (isUserUpdating) {
      return;
    }

    if (newBackgroundClassName === userData.backgroundClassName) {
      return;
    }

    mutateUserUpdate({
      backgroundClassName: newBackgroundClassName,
      onSuccess: () => {},
    });
  };

  return (
    <div className={"grid-block grid-block-1 sm:grid-block-2"}>
      <div className={"sm:col-span-2"}>
        <h1 className={"font-light text-center"}>Background style</h1>
      </div>

      {Object.values(BACKGROUND_CLASS_NAMES).map((value) => {
        const capitalizedClassName = capitalizeFirstLetter(value);
        const newBackgroundClassName = getDashedText(value);

        return (
          <div key={value} className={"text-center"}>
            <button
              type={"button"}
              onClick={() =>
                handleBackgroundClassNameChange(newBackgroundClassName)
              }
              className={
                "border border-purple-600 text-purple-600 rounded-none hover:bg-purple-600 hover:text-white w-48"
              }
            >
              {capitalizedClassName}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SettingsPage;
