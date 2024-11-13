import { UserType } from "./userType.ts";

export type ConferenceType = {
  id?: number;
  name: string;
  date: string;
  time: string;
  location: {
    venue: string;
    hall: string;
    address: string;
  };
  description: string;
  speakers: {
    name: string;
    role: string;
    company: string;
  }[];
  agendas: {
    time: string;
    event: string;
  }[];
  participants: UserType[];
};
