import { getProfile, getSocialLinks, getTechStack } from "@/sanity/fetchers";
import { decodeEmail, decodePhoneNumber } from "@/utils/string";

export const dynamic = "force-static";

export async function GET() {
  const [profile, socialLinks, techStack] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getTechStack(),
  ]);

  const content = `# About

${profile?.about?.trim() || ""}

## Personal Information

- Name: ${profile?.displayName || ""}
- Phone: ${profile?.phoneNumber ? decodePhoneNumber(profile.phoneNumber) : ""}
- Email: ${profile?.email ? decodeEmail(profile.email) : ""}
- Location: ${profile?.address || ""}
- Website: ${profile?.website || ""}

## Social Links

${socialLinks?.map((item) => `- [${item.title}](${item.href})`).join("\n") || ""}

## Tech Stack

${techStack?.map((item) => `- [${item.title}](${item.href})`).join("\n") || ""}\n`;

  return new Response(content, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
    },
  });
}
