import { useMutation, useQuery, useQueryClient } from "react-query";
import { createUser, getUser, getUsersList, updateUser } from "./api.ts";
import { USER_QUERY_KEY, USERS_LIST_QUERY_KEY } from "./constants.ts";
import useAuth from "../../hooks/useAuth.ts";
import useUserContext from "../../hooks/useUserContext.ts";
import { CreateUserType } from "../../types/userType.ts";

export const useUsersList = () => {
  const { data, isLoading } = useQuery(
    [USERS_LIST_QUERY_KEY],
    () => getUsersList(),
    { onSettled: () => {} },
  );

  return {
    usersListData: data,
    isUsersListDataLoading: isLoading,
  };
};

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

export const useUserCreate = () => {
  const { mutateAsync, isLoading } = useMutation(
    ({ data }: { data: CreateUserType }) => createUser(data),
  );

  return {
    mutateUserCreate: mutateAsync,
    isUserCreating: isLoading,
  };
};

export const useUserUpdate = () => {
  const queryClient = useQueryClient();

  const { userData } = useUserContext();

  const { mutate, isLoading } = useMutation(
    ({
      backgroundClassName,
    }: {
      backgroundClassName: string;
      onSuccess: () => void;
    }) => updateUser(userData?.id ?? 0, backgroundClassName),
    {
      onSuccess: async (_data, { onSuccess }) => {
        await queryClient.invalidateQueries([USER_QUERY_KEY]);

        onSuccess();
      },
    },
  );

  return {
    mutateUserUpdate: mutate,
    isUserUpdating: isLoading,
  };
};
