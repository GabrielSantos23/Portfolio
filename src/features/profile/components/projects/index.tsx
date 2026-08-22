import { CollapsibleList } from "@/components/collapsible-list";

import { getProjects, type SanityProject } from "@/sanity/schemas/lib/profile";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ProjectItem } from "./project-item";

export async function Projects() {
  const projects = await getProjects();

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projetos
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({projects.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={projects}
        max={4}
        renderItem={(item: SanityProject) => <ProjectItem project={item} />}
      />
    </Panel>
  );
}
