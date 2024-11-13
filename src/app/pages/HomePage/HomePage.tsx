import { useLoginTokenCreate } from "../../api/login/queryHooks.ts";
import HomePageLayout from "./HomePageLayout.tsx";
import LoadingSpinner from "../../components/spinners/LoadingSpinner.tsx";
import useAuth from "../../hooks/useAuth.ts";

const HomePage = () => {
  const { mutateLoginTokenCreate, isLoginTokenCreating } =
    useLoginTokenCreate();

  const { isAuthenticated, setToken } = useAuth();

  const handleLoginTokenCreate = () => {
    if (isLoginTokenCreating) {
      return;
    }

    mutateLoginTokenCreate({
      data: {
        email: "user@example.com",
        password: "password",
      },
      onSuccess: ({ access_token, user_id }) => setToken(access_token, user_id),
    });
  };

  if (!isAuthenticated) {
    return (
      <HomePageLayout>
        <button
          type={"button"}
          onClick={handleLoginTokenCreate}
          className={"bg-sky-500 w-full sm:w-fit"}
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
