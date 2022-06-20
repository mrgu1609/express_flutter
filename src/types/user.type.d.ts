export type TLoginDao = {
  results: {
    uid: number;
    username: string;
    password: string;
  } | null;
  code: number;
  err: Error;
};
