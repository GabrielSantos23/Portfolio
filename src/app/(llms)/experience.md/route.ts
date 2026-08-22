import { getExperiences } from "@/sanity/schemas/lib/profile";

export const dynamic = "force-static";

export async function GET() {
  const experiences = await getExperiences();

  const content = `# Experience

${experiences
  .map((item) =>
    item.positions
      .map((position) => {
        const skills =
          position.skills?.map((skill) => skill).join(", ") || "N/A";
        return `## ${position.title} | ${item.companyName}

Duration: ${position.employmentPeriodStart} - ${position.employmentPeriodEnd || "Present"}

Skills: ${skills}

${position.description?.trim() || ""}`;
      })
      .join("\n\n")
  )
  .join("\n\n")}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
