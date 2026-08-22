import { Markdown } from "@/components/markdown";
import { Prose } from "@/components/ui/typography";
import { USER } from "@/data/user";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";
import { getProfile } from "@/sanity/fetchers";

export async function About() {
  const user = await getProfile();
  if (!user) return null;
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>Sobre mim</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Prose>
          <Markdown>{user.about}</Markdown>
        </Prose>
      </PanelContent>
    </Panel>
  );
}
