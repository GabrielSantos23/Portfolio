import { getProjects } from "@/sanity/schemas/lib/profile";

export const dynamic = "force-static";

export async function GET() {
  const projects = await getProjects();

  const content = `# Projects

${projects
  .map((item) => {
    const skills = item.skills ? `\n\nSkills: ${item.skills.join(", ")}` : "";
    const description = item.description
      ? `\n\n${item.description.trim()}`
      : "";
    return `## ${item.title}

Project URL: ${item.link}${skills}${description}`;
  })
  .join("\n\n")}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
