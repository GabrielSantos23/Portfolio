import { groq } from "next-sanity";

export const PROFILE_QUERY = groq`
  *[_type == "profile"][0] {
    firstName,
    lastName,
    displayName,
    username,
    gender,
    bio,
    about,
    flipSentences,
    address,
    phoneNumber,
    email,
    website,
    spotifyUrl,
    otherWebsites,
    dateOfBirth,
    jobTitle,
    jobs[] {
      title,
      company,
      website
    },
    "avatarUrl": coalesce(avatarUrl, avatar.asset->url),
    ogImage,
    keywords,
    dateCreated
  }
`;

export const EXPERIENCES_QUERY = groq`
  *[_type == "experience"] | order(order asc) {
    _id,
    companyName,
    "companyLogo": coalesce(companyLogoUrl, companyLogo.asset->url),
    isCurrentEmployer,
    positions[] {
      _key,
      title,
      "employmentPeriod": {
        "start": employmentPeriodStart,
        "end": employmentPeriodEnd
      },
      employmentType,
      icon,
      description,
      skills,
      isExpanded
    }
  }
`;

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    "period": {
      "start": periodStart,
      "end": periodEnd
    },
    link,
    skills,
    description,
    "logo": coalesce(logoUrl, logo.asset->url),
    isExpanded
  }
`;

export const AWARDS_QUERY = groq`
  *[_type == "award"] | order(order asc) {
    _id,
    prize,
    title,
    date,
    grade,
    description,
    referenceLink
  }
`;

export const CERTIFICATIONS_QUERY = groq`
  *[_type == "certification"] | order(order asc) {
    _id,
    title,
    issuer,
    "issuerLogoURL": coalesce(issuerLogoUrl, issuerLogo.asset->url),
    issuerIconName,
    issueDate,
    credentialID,
    credentialURL
  }
`;

export const TECH_STACK_QUERY = groq`
  *[_type == "techStack"] | order(order asc) {
    _id,
    key,
    title,
    href,
    categories,
    theme,
    "iconUrl": icon.asset->url,
    "iconLightUrl": iconLight.asset->url,
    "iconDarkUrl": iconDark.asset->url
  }
`;

export const SOCIAL_LINKS_QUERY = groq`
  *[_type == "socialLink"] | order(order asc) {
    _id,
    title,
    description,
    href,
    "icon": coalesce(iconUrl, icon.asset->url)
  }
`;

export const POSTS_QUERY = groq`
  *[_type == "post"] | order(createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "image": coalesce(imageUrl, image.asset->url),
    category,
    "new": isNew,
    createdAt,
    updatedAt
  }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "image": coalesce(imageUrl, image.asset->url),
    category,
    "new": isNew,
    content,
    body,
    createdAt,
    updatedAt
  }
`;

export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && category == $category] | order(createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "image": coalesce(imageUrl, image.asset->url),
    category,
    "new": isNew,
    createdAt,
    updatedAt
  }
`;
