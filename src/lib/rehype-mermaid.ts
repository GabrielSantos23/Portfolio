import type { Root } from "hast";
import { visit } from "unist-util-visit";

export function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "pre" || !parent || index === undefined) return;

      const codeEl = node.children[0];
      if (!codeEl || codeEl.type !== "element" || codeEl.tagName !== "code")
        return;

      const className = codeEl.properties?.className;
      if (!Array.isArray(className)) return;

      const isMermaid = className.some(
        (cls) => typeof cls === "string" && cls === "language-mermaid"
      );
      if (!isMermaid) return;

      const rawText = codeEl.children
        .map((child) => {
          if (child.type === "text") return child.value;
          return "";
        })
        .join("");

      parent.children[index] = {
        type: "element",
        tagName: "mermaid-diagram",
        properties: { chart: rawText },
        children: [],
      };
    });
  };
}
