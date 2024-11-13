import {
  fetchDelete,
  fetchGet,
  fetchPatch,
  fetchPost,
} from "../../utils/api.ts";
import { ConferenceType } from "../../types/conferenceType.ts";

export const getConferencesList = (): Promise<ConferenceType[]> => {
  return fetchGet({ url: "conferences" });
};

export const createConference = (newConference: ConferenceType) => {
  return fetchPost(`conferences`, newConference);
};

export const updateConferenceParticipants = (id: number, userId: number) => {
  return fetchPatch(`conferences/${id}`, { userId });
};

export const deleteConference = (id: number) => {
  return fetchDelete(`conferences/${id}`);
};
