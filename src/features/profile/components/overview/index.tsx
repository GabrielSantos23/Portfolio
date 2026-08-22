import { GlobeIcon, MapPinIcon } from "lucide-react";

import { USER } from "@/data/user";
import { urlToName } from "@/utils/url";

import { Panel, PanelContent } from "../panel";
import { EmailItem } from "./email-item";
import { IntroItem } from "./intro-item";
import { JobItem } from "./job-item";
import { PhoneItem } from "./phone-item";
import { SpotifyNowPlaying } from "./spotify-now-playing";
import { getProfile } from "@/sanity/fetchers";

export async function Overview() {
  const user = await getProfile();
  if (!user) return null;
  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="space-y-2">
        {/* {user.jobs.map((job, index) => {
          return (
            <JobItem
              key={index}
              title={job.title}
              company={job.company}
              website={job.website}
            />
          );
        })} */}

        <IntroItem icon={MapPinIcon} content={user.address} />

        <PhoneItem phoneNumber={user.phoneNumber} />

        <EmailItem email={user.email} />

        <IntroItem
          icon={GlobeIcon}
          content={urlToName(user.website)}
          href={user.website}
        />

        <SpotifyNowPlaying />
      </PanelContent>
    </Panel>
  );
}
