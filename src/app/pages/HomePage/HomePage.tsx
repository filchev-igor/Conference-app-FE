import HomePageLayout from "./HomePageLayout.tsx";
import useAuth from "../../hooks/useAuth.ts";
import { useState } from "react";
import LoginBlock from "./LoginBlock.tsx";
import RegistrationBlock from "./RegistrationBlock.tsx";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const [isLogging, setIsLogging] = useState(true);

  if (!isAuthenticated && isLogging) {
    <LoginBlock />;
  }

  if (!isAuthenticated && !isLogging) {
    <HomePageLayout>
      <RegistrationBlock />
    </HomePageLayout>;
  }

  return (
    <HomePageLayout>
      <strong>You are authorized</strong>
    </HomePageLayout>
  );
};

export default HomePage;
