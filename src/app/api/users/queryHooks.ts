import { useQuery } from "react-query";
import { getUser } from "./api.ts";
import { USER_QUERY_KEY } from "./constants.ts";
import useAuth from "../../hooks/useAuth.ts";
import { USER_ROLES } from "../../constants/users.ts";

export const useUser = () => {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery(
    [USER_QUERY_KEY],
    () => getUser(userId ?? 0),
    { enabled: !!userId, onSettled: () => {} },
  );

  const hasUserRole = data?.role === USER_ROLES.USER;
  const hasAdminRole = data?.role === USER_ROLES.ADMIN;

  return {
    userData: data,
    isUserDataLoading: isLoading,
    hasUserRole,
    hasAdminRole,
  };
};
