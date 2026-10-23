import { DocumentRenderer, type DocumentRendererProps } from "@keystatic/core/renderer";
import Link from "next/link";
import { GithubIcon, MailIcon } from "./icons";
import { inlineLink } from "./shell";

// Renders a Keystatic rich-text field with the site's link style.
// linkIcons adds the GitHub/mail glyphs the home bio shows before those links.
export function RichText({
  document,
  paragraphClassName,
  linkIcons = false,
}: {
  document: DocumentRendererProps["document"];
  paragraphClassName?: string;
  linkIcons?: boolean;
}) {
  return (
    <DocumentRenderer
      document={document}
      renderers={{
        block: { paragraph: ({ children }) => <p className={paragraphClassName}>{children}</p> },
        inline: {
          link: ({ href, children }) => {
            if (href.startsWith("/")) {
              return (
                <Link className={inlineLink} href={href}>
                  {children}
                </Link>
              );
            }
            const icon = linkIcons && (href.includes("github.com") ? <GithubIcon /> : href.startsWith("mailto:") ? <MailIcon /> : null);
            return (
              <a className={inlineLink} href={href} target="_blank" rel="noopener noreferrer">
                {icon && <span className="translate-y-px self-center">{icon}</span>}
                {children}
              </a>
            );
          },
        },
      }}
    />
  );
}
