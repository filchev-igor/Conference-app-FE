import { useMutation } from "react-query";
import { loginTokenCreate } from "./api.ts";

import {
  CreateLoginTokenPromiseType,
  CreateLoginTokenType,
} from "../../types/loginType.ts";

export const useLoginTokenCreate = () => {
  const { mutate, isLoading } = useMutation(
    ({
      data,
    }: {
      data: CreateLoginTokenType;
      onSuccess: (outputData: CreateLoginTokenPromiseType) => void;
    }) => loginTokenCreate(data),
    {
      onSuccess: async (outputData, { onSuccess }) => {
        onSuccess(outputData);
      },
    },
  );

  return {
    mutateLoginTokenCreate: mutate,
    isLoginTokenCreating: isLoading,
  };
};
