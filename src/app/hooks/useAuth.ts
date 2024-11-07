import { useEffect, useState } from "react";

const useAuth = () => {
  const initialUserId = localStorage.getItem("user_id");

  // State to manage the authentication token
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("auth_token"),
  );
  const [userId, setUserId] = useState(
    !!initialUserId ? Number(initialUserId) : null,
  );

  // Function to update the token in localStorage and state
  const setToken = (token: string, sessionUserId: number) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_id", sessionUserId.toString());

    setAuthToken(token);
    setUserId(sessionUserId);

    window.dispatchEvent(new CustomEvent("authTokenUpdate"));
  };

  // Logout function to remove the token and clear the state
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");

    setAuthToken(null);
    setUserId(null);

    window.dispatchEvent(new CustomEvent("authTokenUpdate"));
  };

  // Listen for changes to localStorage across tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth_token") {
        setAuthToken(event.newValue);
      }

      if (event.key === "user_id") {
        setUserId(Number(event.newValue));
      }
    };

    const authTokenUpdate = () => {
      const token = localStorage.getItem("auth_token");

      setAuthToken(token);
    };

    const userIdUpdate = () => {
      const newUserId = localStorage.getItem("user_id");

      setUserId(Number(newUserId));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authTokenUpdate", authTokenUpdate);
    window.addEventListener("authTokenUpdate", userIdUpdate);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.addEventListener("authTokenUpdate", authTokenUpdate);
      window.addEventListener("authTokenUpdate", userIdUpdate);
    };
  }, []);

  return { authToken, setToken, logout, isAuthenticated: !!authToken, userId };
};

export default useAuth;
