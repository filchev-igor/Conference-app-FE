export type ConferenceType = {
  id?: number;
  title: string;
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
  registration: {
    info: string;
    action: string;
  };
};
