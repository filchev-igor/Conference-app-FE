const userData1 = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  username: "johndoe123",
  password: "hashedPassword123",
  phone: "+1234567890",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "USA",
  },
  preferences: {
    language: "English",
    timezone: "America/New_York",
    newsletter: true,
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  },
  createdAt: "2024-10-12T10:00:00Z",
  lastLogin: "2024-10-12T15:30:00Z",
};

export const userData = [userData1];

export const USER_QUERY_KEY = "user";
