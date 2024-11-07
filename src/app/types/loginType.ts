export type CreateLoginTokenType = {
  email: string;
  password: string;
};

export type CreateLoginTokenPromiseType = {
  access_token: string;
  token_type: string;
  user_id: number;
};
