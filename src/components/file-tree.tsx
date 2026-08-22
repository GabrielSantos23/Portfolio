"use client";

import React, { createContext, useContext, useState } from "react";
import {
  FolderIcon,
  FileIcon,
  ChevronRightIcon,
  FileCodeIcon,
  FileJsonIcon,
  FileTypeIcon,
  FileTextIcon,
  ImageIcon,
  TerminalIcon,
  SettingsIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileTreeContextType {
  defaultOpen?: boolean;
}

const FileTreeContext = createContext<FileTreeContextType>({});

export function FileTree({
  children,
  defaultOpen = true,
  className,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  return (
    <FileTreeContext.Provider value={{ defaultOpen }}>
      <div
        className={cn(
          "not-prose my-6 overflow-hidden rounded-xl border border-border bg-code/50 p-4 font-mono text-sm shadow-sm backdrop-blur-sm",
          className
        )}
      >
        {children}
      </div>
    </FileTreeContext.Provider>
  );
}

export function Folder({
  name,
  children,
  defaultOpen,
  label,
}: {
  name: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  label?: string;
}) {
  const context = useContext(FileTreeContext);
  const [isOpen, setIsOpen] = useState(
    defaultOpen ?? context.defaultOpen ?? false
  );

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-foreground transition-all duration-200 hover:bg-muted/50 active:scale-[0.99]"
      >
        <ChevronRightIcon
          size={14}
          className={cn(
            "text-muted-foreground/50 transition-transform duration-200 group-hover:text-muted-foreground",
            isOpen && "rotate-90"
          )}
        />
        <FolderIcon
          size={16}
          className="fill-blue-400/20 text-blue-400/80 transition-colors group-hover:text-blue-400"
        />
        <span className="font-medium tracking-wide">{name}</span>
        {label && (
          <span className="ml-2 rounded border border-border/50 bg-muted px-1.5 py-0.5 font-sans text-[10px] tracking-wider text-muted-foreground uppercase transition-colors group-hover:border-border group-hover:text-foreground/70">
            {label}
          </span>
        )}
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="mt-1 ml-[11px] flex flex-col border-l-2 border-border/30 pl-3 transition-colors duration-200 hover:border-border/60">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function File({ name, label }: { name: string; label?: string }) {
  const getIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    const lowerName = fileName.toLowerCase();

    if (lowerName === "dockerfile" || lowerName === ".dockerignore") {
      return (
        <TerminalIcon
          size={16}
          className="text-blue-500/80 group-hover:text-blue-500"
        />
      );
    }
    if (lowerName === ".env" || lowerName.startsWith(".env.")) {
      return (
        <SettingsIcon
          size={16}
          className="text-emerald-400/80 group-hover:text-emerald-400"
        />
      );
    }

    switch (ext) {
      case "tsx":
      case "ts":
      case "js":
      case "jsx":
        return (
          <FileCodeIcon
            size={16}
            className="text-indigo-400/80 group-hover:text-indigo-400"
          />
        );
      case "json":
      case "jsonc":
        return (
          <FileJsonIcon
            size={16}
            className="text-amber-400/80 group-hover:text-amber-400"
          />
        );
      case "rs":
        return (
          <FileTypeIcon
            size={16}
            className="text-orange-400/80 group-hover:text-orange-400"
          />
        );
      case "py":
      case "pyw":
      case "pyc":
        return (
          <FileCodeIcon
            size={16}
            className="text-blue-400/80 group-hover:text-blue-400"
          />
        );
      case "go":
        return (
          <FileCodeIcon
            size={16}
            className="text-cyan-400/80 group-hover:text-cyan-400"
          />
        );
      case "html":
      case "htm":
        return (
          <FileCodeIcon
            size={16}
            className="text-orange-500/80 group-hover:text-orange-500"
          />
        );
      case "css":
      case "scss":
      case "sass":
      case "less":
        return (
          <FileCodeIcon
            size={16}
            className="text-pink-400/80 group-hover:text-pink-400"
          />
        );
      case "md":
      case "mdx":
      case "txt":
        return (
          <FileTextIcon
            size={16}
            className="text-sky-400/80 group-hover:text-sky-400"
          />
        );
      case "yaml":
      case "yml":
      case "toml":
      case "ini":
      case "conf":
        return (
          <SettingsIcon
            size={16}
            className="text-slate-400/80 group-hover:text-slate-400"
          />
        );
      case "sh":
      case "bash":
      case "zsh":
        return (
          <TerminalIcon
            size={16}
            className="text-green-400/80 group-hover:text-green-400"
          />
        );
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "svg":
      case "webp":
      case "ico":
        return (
          <ImageIcon
            size={16}
            className="text-purple-400/80 group-hover:text-purple-400"
          />
        );
      default:
        return (
          <FileIcon
            size={16}
            className="text-muted-foreground/60 group-hover:text-muted-foreground/80"
          />
        );
    }
  };

  return (
    <div className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground transition-all duration-200 hover:bg-muted/30 hover:text-foreground">
      <div className="w-[14px]" />
      <div className="transition-transform duration-200 group-hover:scale-110">
        {getIcon(name)}
      </div>
      <span className="font-medium tracking-wide transition-colors">
        {name}
      </span>
      {label && (
        <span className="ml-1.5 font-sans text-[10px] text-muted-foreground/50 transition-colors group-hover:text-muted-foreground/80">
          — {label}
        </span>
      )}
    </div>
  );
}

interface TreeNode {
  name: string;
  label?: string;
  isFolder: boolean;
  children: TreeNode[];
}

function parseTreeText(text: string): TreeNode[] {
  const lines = text.trim().split("\n");
  const root: TreeNode[] = [];
  const stack: { depth: number; node: TreeNode }[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "│") continue;

    let depth = 0;
    let i = 0;
    while (i + 3 < line.length) {
      const seg = line.substring(i, i + 4);
      if (seg === "│   " || seg === "    ") {
        depth++;
        i += 4;
      } else {
        break;
      }
    }

    let nameStr = line
      .substring(i)
      .replace(/^[├└]──\s*/, "")
      .replace(/^│\s*/, "");

    if (
      i === 0 &&
      !line.startsWith("├") &&
      !line.startsWith("└") &&
      !line.startsWith("│")
    ) {
      nameStr = trimmed;
    }

    let name = nameStr;
    let label: string | undefined;
    const commentMatch = nameStr.match(/^(.+?)\s{2,}#\s*(.+)$/);
    if (commentMatch) {
      name = commentMatch[1].trim();
      label = commentMatch[2].trim();
    }

    const isFolder = name.endsWith("/");
    if (isFolder) name = name.replace(/\/$/, "");

    const node: TreeNode = { name, label, isFolder, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop();
    }

    if (stack.length > 0) {
      stack[stack.length - 1].node.children.push(node);
    } else {
      root.push(node);
    }

    if (isFolder) {
      stack.push({ depth, node });
    }
  }

  return root;
}

function RenderNodes({ nodes }: { nodes: TreeNode[] }) {
  return (
    <>
      {nodes.map((node, i) =>
        node.isFolder ? (
          <Folder key={`${node.name}-${i}`} name={node.name} label={node.label}>
            <RenderNodes nodes={node.children} />
          </Folder>
        ) : (
          <File key={`${node.name}-${i}`} name={node.name} label={node.label} />
        )
      )}
    </>
  );
}

export function FileTreeFromText({ treeData }: { treeData: string }) {
  const nodes = parseTreeText(treeData);
  return (
    <FileTree>
      <RenderNodes nodes={nodes} />
    </FileTree>
  );
}
