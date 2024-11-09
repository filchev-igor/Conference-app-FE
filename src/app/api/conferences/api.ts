import { fetchDelete, fetchGet, fetchPost } from "../../utils/api.ts";
import { ConferenceType } from "../../types/conferenceType.ts";

export const getConferencesList = (): Promise<ConferenceType[]> => {
  return fetchGet({ url: "conferences" });
};

export const createConference = (newConference: ConferenceType) => {
  return fetchPost(`conferences`, newConference);
};

export const deleteConference = (id: number) => {
  return fetchDelete(`conferences/${id}`);
};
