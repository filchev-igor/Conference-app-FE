import { fetchPost } from "../../utils/api.ts";
import { CreateLoginTokenProps } from "../../types/userType.ts";

export const loginTokenCreate = (data: CreateLoginTokenProps) => {
  return fetchPost("login", data);
};
