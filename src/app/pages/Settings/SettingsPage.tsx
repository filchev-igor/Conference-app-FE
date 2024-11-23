import useBackgroundClassNameContext from "../../hooks/useBackgroundClassNameContext.ts";
import { BACKGROUND_CLASS_NAMES } from "../../constants/siteStyles.ts";
import { capitalizeFirstLetter, getDashedText } from "../../utils/text.ts";
import "./styles.css";

const SettingsPage = () => {
  const { setBackgroundClassName } = useBackgroundClassNameContext();

  return (
    <div className={"grid-block grid-block-1 sm:grid-block-2"}>
      <div className={"sm:col-span-2"}>
        <h1 className={"font-light text-center"}>Background style</h1>
      </div>

      {Object.values(BACKGROUND_CLASS_NAMES).map((value) => {
        const capitalizedClassName = capitalizeFirstLetter(value);
        const newBackgroundClassName = getDashedText(value);

        console.log(newBackgroundClassName);

        return (
          <div key={value} className={"text-center"}>
            <button
              type={"button"}
              onClick={() => setBackgroundClassName(newBackgroundClassName)}
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
