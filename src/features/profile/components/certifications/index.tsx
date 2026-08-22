import { CollapsibleList } from "@/components/collapsible-list";

import {
  getCertifications,
  type SanityCertification,
} from "@/sanity/schemas/lib/profile";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { CertificationItem } from "./certification-item";

export async function Certifications() {
  const certifications = await getCertifications();

  return (
    <Panel id="certs">
      <PanelHeader>
        <PanelTitle>
          Certificações
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({certifications.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={certifications}
        max={8}
        renderItem={(item: SanityCertification) => (
          <CertificationItem certification={item} />
        )}
      />
    </Panel>
  );
}
