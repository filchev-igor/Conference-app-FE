import { useMutation } from "react-query";
import { loginTokenCreate } from "./api.ts";

import { CreateLoginTokenType } from "../../types/loginType.ts";

export const useLoginTokenCreate = () => {
  const { mutateAsync, isLoading } = useMutation(
    ({ data }: { data: CreateLoginTokenType }) => loginTokenCreate(data),
  );

  return {
    mutateLoginTokenCreate: mutateAsync,
    isLoginTokenCreating: isLoading,
  };
};
