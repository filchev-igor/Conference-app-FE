import { ConferenceType } from "../types/conferenceType.ts";
import { faker } from "@faker-js/faker/locale/ar";

const generateRandomTime = (): string => {
  const hours = faker.number.int({ min: 1, max: 12 });
  const minutes = faker.number
    .int({ min: 0, max: 59 })
    .toString()
    .padStart(2, "0");
  const period = faker.helpers.arrayElement(["AM", "PM"]);
  return `${hours}:${minutes} ${period}`;
};

export const generateRandomConference = (): ConferenceType => {
  const conferenceTitle = faker.company.catchPhrase();
  const conferenceDate = faker.date.future().toDateString();

  const randomAgenda = Array.from({ length: 5 }).map(() => ({
    time: generateRandomTime(),
    event: faker.lorem.sentence(),
  }));

  return {
    title: conferenceTitle,
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
    registration: {
      info: "Please register in advance to secure your spot. Limited seats are available.",
      action: "Click the 'Register' button below.",
    },
  };
};
