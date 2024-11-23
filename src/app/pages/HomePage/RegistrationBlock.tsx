import InputLabel from "./InputLabel.tsx";
import LoadingSpinner from "../../components/spinners/LoadingSpinner.tsx";
import { ReactElement, useState } from "react";
import toast from "react-hot-toast";
import { useUserCreate } from "../../api/users/queryHooks.ts";
import { useLoginTokenCreate } from "../../api/login/queryHooks.ts";
import useAuth from "../../hooks/useAuth.ts";

const RegistrationBlock = ({ children }: { children: ReactElement }) => {
  const { setToken } = useAuth();

  const { mutateUserCreate, isUserCreating } = useUserCreate();
  const { mutateLoginTokenCreate, isLoginTokenCreating } =
    useLoginTokenCreate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isButtonDisabled = !email.length || !password.length || !name.length;

  const handleLoginTokenCreate = async () => {
    try {
      if (isUserCreating || isLoginTokenCreating) {
        return;
      }

      if (isButtonDisabled) {
        return;
      }

      await mutateUserCreate({
        data: { name, email, password },
      });

      const { access_token, user_id } = await mutateLoginTokenCreate({
        data: {
          email,
          password,
        },
      });

      setToken(access_token, user_id);

      setEmail("");
      setPassword("");
    } catch (error: any) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <InputLabel
        label={"Name"}
        placeholder={"Gorbunkov Semyon Semyonich"}
        value={name}
        onChange={setName}
      />

      <InputLabel
        label={"E-mail"}
        placeholder={"username@example.com"}
        value={email}
        onChange={setEmail}
      />

      <InputLabel
        label={"Password"}
        placeholder={"Password"}
        type={"password"}
        value={password}
        onChange={setPassword}
      />

      <div className={"flex w-3/6 justify-between"}>
        <button
          type={"button"}
          onClick={handleLoginTokenCreate}
          className={`${!isButtonDisabled ? "bg-sky-500" : "bg-gray-500"} w-full sm:w-fit`}
          disabled={isButtonDisabled}
        >
          {isUserCreating ? (
            <div className={"flex"}>
              <LoadingSpinner />
              Processing
            </div>
          ) : (
            "Register"
          )}
        </button>

        {children}
      </div>
    </>
  );
};

export default RegistrationBlock;
