import { award } from "./award";
import { certification } from "./certification";
import { experience } from "./experience";
import { post } from "./post";
import { profile } from "./profile";
import { project } from "./project";
import { socialLink } from "./socialLink";
import { techStack } from "./techStack";

export const schemaTypes = [
  // Singleton
  profile,

  // Collections
  experience,
  project,
  award,
  certification,
  techStack,
  socialLink,

  // Blog
  post,
];
