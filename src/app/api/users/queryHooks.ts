import { useQuery } from "react-query";
import { getUser } from "./api.ts";
import { USER_QUERY_KEY } from "./constants.ts";
import useAuth from "../../hooks/useAuth.ts";

export const useUser = () => {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery(
    [USER_QUERY_KEY],
    () => getUser(userId ?? 0),
    { enabled: !!userId, onSettled: () => {} },
  );

  return {
    userData: data,
    isUserDataLoading: isLoading,
  };
};
