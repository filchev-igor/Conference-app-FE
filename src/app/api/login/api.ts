import { fetchPost } from "../../utils/api.ts";

import {
  CreateLoginTokenPromiseType,
  CreateLoginTokenType,
} from "../../types/loginType.ts";

export const loginTokenCreate = (
  data: CreateLoginTokenType,
): Promise<CreateLoginTokenPromiseType> => {
  return fetchPost("login", data);
};
