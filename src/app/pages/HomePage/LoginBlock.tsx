import InputLabel from "./InputLabel.tsx";
import LoadingSpinner from "../../components/spinners/LoadingSpinner.tsx";
import { ReactElement, useState } from "react";
import toast from "react-hot-toast";
import { useLoginTokenCreate } from "../../api/login/queryHooks.ts";
import useAuth from "../../hooks/useAuth.ts";

const LoginBlock = ({ children }: { children: ReactElement }) => {
  const { setToken } = useAuth();

  const { mutateLoginTokenCreate, isLoginTokenCreating } =
    useLoginTokenCreate();

  // user@example.com
  // password
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password");

  const isButtonDisabled = !email.length || !password.length;

  const handleLoginTokenCreate = async () => {
    try {
      if (isLoginTokenCreating) {
        return;
      }

      if (isButtonDisabled) {
        return;
      }

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
          {isLoginTokenCreating ? (
            <div className={"flex"}>
              <LoadingSpinner />
              Processing
            </div>
          ) : (
            "Authorize"
          )}
        </button>

        {children}
      </div>
    </>
  );
};

export default LoginBlock;
