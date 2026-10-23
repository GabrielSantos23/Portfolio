import "server-only";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "src", "showcase");

export type SourceFile = { path: string; code: string };

/** Lista .ts/.tsx de uma pasta (com subpastas), sem o index que só reexporta. */
async function listFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) return listFiles(full);
      return /\.tsx?$/.test(e.name) && !/^index\.tsx?$/.test(e.name) ? [full] : [];
    }),
  );
  return nested.flat();
}

/**
 * Código de um componente de /componentes: os arquivos do registry que o demo
 * importa e, por último, o próprio demo como exemplo de uso. Os imports
 * aparecem como "@/..." (sem o prefixo interno "showcase/") para colar direto.
 */
export async function getShowcaseSource(demo: string): Promise<SourceFile[]> {
  const demoFile = path.join(ROOT, "registry", "examples", `${demo}.tsx`);
  const demoCode = await fs.readFile(demoFile, "utf8");

  const files = new Set<string>();
  for (const [, spec] of demoCode.matchAll(/from\s+"@\/showcase\/(registry\/(?:transformed\/)?components\/[^"]+)"/g)) {
    const target = path.join(ROOT, spec);
    const isDir = await fs.stat(target).then((s) => s.isDirectory(), () => false);
    for (const f of isDir ? await listFiles(target) : [`${target}.tsx`]) files.add(f);
  }
  files.add(demoFile);

  return Promise.all(
    [...files].map(async (file) => ({
      path: path.relative(ROOT, file).replaceAll("\\", "/").replace(/^registry\/(transformed\/)?/, ""),
      code: (await fs.readFile(file, "utf8")).replaceAll("@/showcase/", "@/"),
    })),
  );
}
