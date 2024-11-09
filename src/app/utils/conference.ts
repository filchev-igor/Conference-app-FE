import { ConferenceType } from "../types/conferenceType.ts";
import { faker } from "@faker-js/faker/locale/ar";

const generateRandomTime = () => {
  const hours = faker.number
    .int({ min: 0, max: 23 })
    .toString()
    .padStart(2, "0");
  const minutes = faker.number
    .int({ min: 0, max: 59 })
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const generateRandomConference = (): ConferenceType => {
  const { 0: conferenceDate } = faker.date.future().toISOString().split("T");

  const randomAgenda = Array.from({ length: 5 }).map(() => ({
    time: generateRandomTime(),
    event: faker.lorem.sentence(),
  }));

  return {
    name: faker.company.catchPhrase(),
    date: conferenceDate,
    time: `${generateRandomTime()} - ${generateRandomTime()}`,
    location: {
      venue: faker.company.name(),
      hall: faker.commerce.department(),
      address: faker.location.streetAddress() + ", " + faker.location.city(),
    },
    description: faker.lorem.paragraph(),
    speakers: Array.from({ length: 3 }).map(() => ({
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      company: faker.company.name(),
    })),
    agendas: randomAgenda,
  };
};
