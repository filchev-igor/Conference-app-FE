import { useState, useEffect } from "react";

const useAuth = () => {
  // State to manage the authentication token
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("auth_token"),
  );

  // Function to update the token in localStorage and state
  const setToken = (token: string) => {
    localStorage.setItem("auth_token", token);

    setAuthToken(token);

    window.dispatchEvent(new Event("authTokenChange"));
  };

  // Logout function to remove the token and clear the state
  const logout = () => {
    localStorage.removeItem("auth_token");

    setAuthToken(null);

    window.dispatchEvent(new Event("authTokenChange"));
  };

  // Listen for changes to localStorage across tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth_token") {
        setAuthToken(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { authToken, setToken, logout, isAuthenticated: !!authToken };
};

export default useAuth;
