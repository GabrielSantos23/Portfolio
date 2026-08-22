import { sanityFetch } from "@/sanity/schemas/lib/fetch";

export interface SanityAward {
  _id: string;
  prize: string;
  title: string;
  date: string;
  grade: string;
  description?: string;
  referenceLink?: string;
  order?: number;
}

export interface SanityCertification {
  _id: string;
  title: string;
  issuer: string;
  issuerLogo?: {
    asset: {
      _ref: string;
    };
  };
  issuerLogoUrl?: string;
  issuerIconName?: string;
  issueDate: string;
  credentialID?: string;
  credentialURL?: string;
  order?: number;
}

export interface SanityExperience {
  _id: string;
  companyName: string;
  companyLogo?: {
    asset: {
      _ref: string;
    };
  };
  companyLogoUrl?: string;
  isCurrentEmployer?: boolean;
  order?: number;
  positions: {
    _key: string;
    title: string;
    employmentPeriodStart: string;
    employmentPeriodEnd?: string;
    employmentType?: string;
    icon?: string;
    description?: string;
    skills?: string[];
    isExpanded?: boolean;
  }[];
}

export interface SanityProject {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  periodStart: string;
  periodEnd?: string;
  link: string;
  skills?: string[];
  description?: string;
  logo?: {
    asset: {
      _ref: string;
    };
  };
  logoUrl?: string;
  isExpanded?: boolean;
  order?: number;
}

export async function getAwards(): Promise<SanityAward[]> {
  const query = `*[_type == "award"] | order(date desc) {
    _id,
    prize,
    title,
    date,
    grade,
    description,
    referenceLink,
    order
  }`;
  return sanityFetch<SanityAward[]>({ query, tags: ["awards"] });
}

export async function getCertifications(): Promise<SanityCertification[]> {
  const query = `*[_type == "certification"] | order(issueDate desc) {
    _id,
    title,
    issuer,
    issuerLogo,
    issuerLogoUrl,
    issuerIconName,
    issueDate,
    credentialID,
    credentialURL,
    order
  }`;
  return sanityFetch<SanityCertification[]>({
    query,
    tags: ["certifications"],
  });
}

export async function getExperiences(): Promise<SanityExperience[]> {
  const query = `*[_type == "experience"] | order(order asc) {
    _id,
    companyName,
    companyLogo,
    companyLogoUrl,
    isCurrentEmployer,
    order,
    positions[]{
      _key,
      title,
      employmentPeriodStart,
      employmentPeriodEnd,
      employmentType,
      icon,
      description,
      skills,
      isExpanded
    }
  }`;
  return sanityFetch<SanityExperience[]>({ query, tags: ["experiences"] });
}

export async function getProjects(): Promise<SanityProject[]> {
  const query = `*[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    periodStart,
    periodEnd,
    link,
    skills,
    description,
    logo,
    logoUrl,
    isExpanded,
    order
  }`;
  return sanityFetch<SanityProject[]>({ query, tags: ["projects"] });
}
