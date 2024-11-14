import { fetchGet, fetchPatch } from "../../utils/api.ts";
import { UserType } from "../../types/userType.ts";

export const getUsersList = (): Promise<UserType[]> => {
  return fetchGet({ url: `users` });
};

export const getUser = (id: number): Promise<UserType> => {
  return fetchGet({ url: `users/${id}` });
};

export const updateUser = (id: number, backgroundClassName: string) => {
  return fetchPatch(`users/${id}`, { backgroundClassName });
};
