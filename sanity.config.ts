import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "portfolio",
  title: "Gabriel Santos - Portfolio",
  basePath: "/studio",

  projectId: "qo5g6ehx",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.listItem()
              .title("Perfil")
              .child(
                S.document()
                  .schemaType("profile")
                  .documentId("profile")
                  .title("Perfil")
              ),
            S.divider(),
            S.listItem()
              .title("Experiências")
              .child(S.documentTypeList("experience").title("Experiências")),
            S.listItem()
              .title("Projetos")
              .child(S.documentTypeList("project").title("Projetos")),
            S.listItem()
              .title("Prêmios")
              .child(S.documentTypeList("award").title("Prêmios")),
            S.listItem()
              .title("Certificações")
              .child(
                S.documentTypeList("certification").title("Certificações")
              ),
            S.listItem()
              .title("Tech Stack")
              .child(S.documentTypeList("techStack").title("Tech Stack")),
            S.listItem()
              .title("Links Sociais")
              .child(S.documentTypeList("socialLink").title("Links Sociais")),
            S.divider(),
            S.listItem()
              .title("Blog Posts")
              .child(S.documentTypeList("post").title("Blog Posts")),
          ]),
    }),
    visionTool(),
    codeInput(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
});
