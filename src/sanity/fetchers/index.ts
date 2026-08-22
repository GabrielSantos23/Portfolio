import { sanityFetch } from "@/sanity/schemas/lib/fetch";
import {
  PROFILE_QUERY,
  EXPERIENCES_QUERY,
  PROJECTS_QUERY,
  AWARDS_QUERY,
  CERTIFICATIONS_QUERY,
  TECH_STACK_QUERY,
  SOCIAL_LINKS_QUERY,
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POSTS_BY_CATEGORY_QUERY,
} from "@/sanity/queries";

import type { UserProfile } from "@/types/user";
import type { Experience } from "@/features/profile/types/experiences";
import type { Project } from "@/features/profile/types/projects";
import type { Award } from "@/features/profile/types/awards";
import type { Certification } from "@/features/profile/types/certifications";
import type { TechStack } from "@/features/profile/types/tech-stack";
import type { SocialLink } from "@/features/profile/types/social-links";
import type { Post, PostMetadata } from "@/types/blog";

export async function getProfile() {
  return sanityFetch<UserProfile | null>({
    query: PROFILE_QUERY,
    tags: ["profile"],
  });
}

export async function getExperiences() {
  return sanityFetch<Experience[]>({
    query: EXPERIENCES_QUERY,
    tags: ["experience"],
  });
}

export async function getProjects() {
  return sanityFetch<Project[]>({
    query: PROJECTS_QUERY,
    tags: ["project"],
  });
}

export async function getAwards() {
  return sanityFetch<Award[]>({
    query: AWARDS_QUERY,
    tags: ["award"],
  });
}

export async function getCertifications() {
  return sanityFetch<Certification[]>({
    query: CERTIFICATIONS_QUERY,
    tags: ["certification"],
  });
}

export async function getTechStack() {
  return sanityFetch<TechStack[]>({
    query: TECH_STACK_QUERY,
    tags: ["techStack"],
  });
}

export async function getSocialLinks() {
  return sanityFetch<SocialLink[]>({
    query: SOCIAL_LINKS_QUERY,
    tags: ["socialLink"],
  });
}

export type SanityPostListItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  category?: string;
  new?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SanityPostFull = SanityPostListItem & {
  content?: string;
  body?: unknown[];
};

export async function getAllPosts() {
  return sanityFetch<SanityPostListItem[]>({
    query: POSTS_QUERY,
    tags: ["post"],
  });
}

export async function getPostBySlug(slug: string) {
  return sanityFetch<SanityPostFull | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ["post"],
  });
}

export async function getPostsByCategory(category: string) {
  return sanityFetch<SanityPostListItem[]>({
    query: POSTS_BY_CATEGORY_QUERY,
    params: { category },
    tags: ["post"],
  });
}
