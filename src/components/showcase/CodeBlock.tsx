import { bundledLanguages, codeToHtml, type BundledLanguage } from "shiki";
import { CopyButton } from "@/components/showcase/CopyButton";

/** Nome legível de cada linguagem no cabeçalho do bloco. */
const LANGUAGE_NAMES: Record<string, string> = {
  bash: "Bash", c: "C", cpp: "C++", css: "CSS", go: "Go", html: "HTML", java: "Java",
  javascript: "JavaScript", js: "JavaScript", json: "JSON", jsx: "JSX", kotlin: "Kotlin",
  mermaid: "Mermaid", python: "Python", py: "Python", rust: "Rust", sh: "Shell", sql: "SQL",
  ts: "TypeScript", tsx: "TSX", typescript: "TypeScript", yaml: "YAML", yml: "YAML",
};

/**
 * Bloco de código dos posts (nó `fence` do Markdoc): cores do shiki no servidor,
 * nenhum JS de realce vai para o navegador; só o botão de copiar é cliente.
 */
export async function CodeBlock({
  content,
  language,
  title,
}: {
  content: string;
  language?: string;
  /** Rótulo do cabeçalho no lugar do nome da linguagem (ex.: o caminho do arquivo). */
  title?: string;
}) {
  const lang = language?.toLowerCase() ?? "";
  const known = lang in bundledLanguages;
  const code = content.replace(/\n$/, "");
  const html = await codeToHtml(code, {
    lang: known ? (lang as BundledLanguage) : "text",
    themes: { light: "github-light", dark: "github-dark-dimmed" },
  });
  const label = title ?? LANGUAGE_NAMES[lang] ?? (lang && lang !== "text" ? lang : "Texto");

  return (
    <figure className="code-block my-6 overflow-hidden rounded-[8px] border border-black/10 bg-zinc-50 dark:border-white/10 dark:bg-[#0a0a0a]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-2 dark:border-white/10">
        <span className="font-mono text-[12px] text-zinc-500 dark:text-zinc-400">{label}</span>
        <CopyButton text={code} />
      </figcaption>
      <div
        className="overflow-x-auto p-4 text-[13px] leading-6 [&_code]:!bg-transparent [&_code]:!p-0 [&_code]:!text-[13px] [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
