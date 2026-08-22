import { getCertifications } from "@/sanity/schemas/lib/profile";

export const dynamic = "force-static";

export async function GET() {
  const certifications = await getCertifications();

  const content = `# Certifications

${certifications.map((item) => `- [${item.title}](${item.credentialURL || "#"})`).join("\n")}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
