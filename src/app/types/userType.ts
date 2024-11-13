import { ConferenceType } from "./conferenceType.ts";

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  conferences?: ConferenceType[];
  backgroundClassName: string;
};
