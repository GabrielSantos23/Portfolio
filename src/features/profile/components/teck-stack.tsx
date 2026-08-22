import Image from "next/image";

import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getTechStack } from "@/sanity/fetchers";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export async function TeckStack() {
  const techStack = await getTechStack();
  if (!techStack) return null;
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Tecnologias</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75"
        )}
      >
        <ul className="flex flex-wrap gap-4 select-none">
          {techStack.map((tech) => {
            return (
              <li key={tech.key} className="flex rounded-md bg-card">
                <SimpleTooltip content={tech.title}>
                  <a
                    href={tech.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tech.title}
                  >
                    {tech.theme && tech.iconLightUrl && tech.iconDarkUrl ? (
                      <>
                        <Image
                          src={tech.iconLightUrl}
                          alt={`${tech.title} light icon`}
                          width={32}
                          height={32}
                          className="hidden size-8 object-contain [html.light_&]:block"
                          unoptimized
                        />
                        <Image
                          src={tech.iconDarkUrl}
                          alt={`${tech.title} dark icon`}
                          width={32}
                          height={32}
                          className="hidden size-8 object-contain [html.dark_&]:block"
                          unoptimized
                        />
                      </>
                    ) : tech.iconUrl ? (
                      <Image
                        src={tech.iconUrl}
                        alt={`${tech.title} icon`}
                        width={32}
                        height={32}
                        className="size-8 object-contain"
                        unoptimized
                      />
                    ) : null}
                    <span className="sr-only">{tech.title}</span>
                  </a>
                </SimpleTooltip>
              </li>
            );
          })}
        </ul>
      </PanelContent>
    </Panel>
  );
}
