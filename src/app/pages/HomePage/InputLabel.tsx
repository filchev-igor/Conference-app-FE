import { HTMLInputTypeAttribute, useId } from "react";

const InputLabel = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  value: string;
  onChange: (newValue: string) => void;
}) => {
  const id = useId();

  return (
    <div className={"w-3/6"}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        required
      />
    </div>
  );
};

export default InputLabel;
