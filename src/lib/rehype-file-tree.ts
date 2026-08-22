import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

/**
 * Plugin que detecta blocos de código com "language-tree" ou que começam com caracteres de árvore
 * e os transforma no componente <FileTree />
 */
export function rehypeFileTree() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "pre") return;

      const codeEl = node.children?.[0] as Element;
      if (!codeEl || codeEl.tagName !== "code") return;

      const className = (codeEl.properties?.className as string[]) || [];
      const isTreeLanguage = className.includes("language-tree");

      // Pega o conteúdo de texto
      // @ts-ignore
      const content = codeEl.children?.[0]?.value || "";

      // Verifica se parece uma árvore (contém caracteres de desenho de caixa)
      const isTreePattern = /├──|└──|│/.test(content);

      if (isTreeLanguage || isTreePattern) {
        // Transformamos o <pre> em um componente customizado que o mdx.tsx vai entender
        node.tagName = "file-tree-diagram";
        node.properties = {
          treeData: content,
        };
        // Removemos os filhos (o <code> antigo)
        node.children = [];
      }
    });
  };
}
