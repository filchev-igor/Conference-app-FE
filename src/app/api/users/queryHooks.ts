import { useMutation } from "react-query";
import { loginTokenCreate } from "./api.ts";
import { CreateLoginTokenProps } from "../../types/userType.ts";

export const useLoginTokenCreate = () => {
  const { mutate, isLoading } = useMutation(
    ({
      data,
    }: {
      data: CreateLoginTokenProps;
      onSuccess: (token: string) => void;
    }) => loginTokenCreate(data),
    {
      onSuccess: async (token: string, { onSuccess }) => {
        onSuccess(token);
      },
    },
  );

  return {
    mutateLoginTokenCreate: mutate,
    isLoginTokenCreating: isLoading,
  };
};
