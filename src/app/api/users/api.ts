import { fetchGet, fetchPatch, fetchPost } from "../../utils/api.ts";
import { CreateUserType, UserType } from "../../types/userType.ts";

export const getUsersList = (): Promise<UserType[]> => {
  return fetchGet({ url: `users` });
};

export const getUser = (id: number): Promise<UserType> => {
  return fetchGet({ url: `users/${id}` });
};

export const createUser = ({ name, email, password }: CreateUserType) => {
  return fetchPost(`users`, { name, email, password });
};

export const updateUser = (id: number, backgroundClassName: string) => {
  return fetchPatch(`users/${id}`, { backgroundClassName });
};
