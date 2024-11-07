import { useMutation } from "react-query";
import { loginTokenCreate } from "./api.ts";
import { CreateLoginTokenProps } from "../../types/userType.ts";

export const useLoginTokenCreate = () => {
  const { mutate, isLoading } = useMutation(
    ({
      data,
    }: {
      data: CreateLoginTokenProps;
      onSuccess: (outputData: {
        access_token: string;
        token_type: string;
      }) => void;
    }) => loginTokenCreate(data),
    {
      onSuccess: async (
        outputData: { access_token: string; token_type: string },
        { onSuccess },
      ) => {
        onSuccess(outputData);
      },
    },
  );

  return {
    mutateLoginTokenCreate: mutate,
    isLoginTokenCreating: isLoading,
  };
};
