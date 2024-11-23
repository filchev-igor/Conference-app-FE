import { useLoginTokenCreate } from "../../api/login/queryHooks.ts";
import HomePageLayout from "./HomePageLayout.tsx";
import LoadingSpinner from "../../components/spinners/LoadingSpinner.tsx";
import useAuth from "../../hooks/useAuth.ts";
import InputLabel from "./InputLabel.tsx";
import { useState } from "react";

const HomePage = () => {
  const { mutateLoginTokenCreate, isLoginTokenCreating } =
    useLoginTokenCreate();

  const { isAuthenticated, setToken } = useAuth();

  // user@example.com
  // password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAuthorizeButtonDisabled = !email.length || !password.length;

  const handleLoginTokenCreate = () => {
    if (isLoginTokenCreating) {
      return;
    }

    if (isAuthorizeButtonDisabled) {
      return;
    }

    mutateLoginTokenCreate({
      data: {
        email,
        password,
      },
      onSuccess: ({ access_token, user_id }) => {
        setToken(access_token, user_id);

        setEmail("");
        setPassword("");
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <HomePageLayout>
        <InputLabel
          label={"E-mail"}
          placeholder={"username@example.com"}
          onChange={setEmail}
        />

        <InputLabel
          label={"Password"}
          placeholder={"Password"}
          type={"password"}
          onChange={setPassword}
        />

        <button
          type={"button"}
          onClick={handleLoginTokenCreate}
          className={`${!isAuthorizeButtonDisabled ? "bg-sky-500" : "bg-gray-500"} w-full sm:w-fit`}
          disabled={isAuthorizeButtonDisabled}
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
      </HomePageLayout>
    );
  }

  return (
    <HomePageLayout>
      <strong>You are authorized</strong>
    </HomePageLayout>
  );
};

export default HomePage;
