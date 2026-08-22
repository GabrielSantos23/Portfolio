import React from "react";

import { getExperiences } from "@/sanity/schemas/lib/profile";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ExperienceItem } from "./experience-item";

export async function Experiences() {
  const experiences = await getExperiences();

  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {experiences.map((experience) => (
          <ExperienceItem key={experience._id} experience={experience} />
        ))}
      </div>
    </Panel>
  );
}
