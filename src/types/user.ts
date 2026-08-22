export type UserProfile = {
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  gender: string;
  bio: string;
  about: string;
  flipSentences: string[];
  address: string;
  phoneNumber: string;
  email: string;
  website: string;
  spotifyUrl: string;
  otherWebsites: string[];
  dateOfBirth: string;
  jobTitle: string;
  jobs: {
    title: string;
    company: string;
    website?: string;
  }[];
  avatarUrl: string;
  ogImage: string;
  keywords: string;
  dateCreated: string;
};
