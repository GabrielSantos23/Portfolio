import { defineField, defineType } from "sanity";

export const techStack = defineType({
  name: "techStack",
  title: "Tech Stack",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Key (identificador)",
      type: "string",
      description:
        "Identificador único, também usado para buscar o ícone correspondente (ex: typescript, react, nextjs)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Nome da Tecnologia",
      type: "string",
      description: "Nome de exibição (ex: TypeScript, React, Next.js)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Website Oficial",
      type: "url",
      description: "URL do website oficial da tecnologia",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categorias",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description:
        "Ex: Language, Framework, Library, UI Library, Database, Tools, Design, etc.",
    }),
    defineField({
      name: "theme",
      title: "Tem variante de tema?",
      type: "boolean",
      initialValue: false,
      description:
        "Se ativado, mostra campos para ícone Light e Dark separados. Se desativado, usa um único ícone.",
    }),
    defineField({
      name: "icon",
      title: "Ícone",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Ícone único da tecnologia (usado quando NÃO tem variante de tema)",
      hidden: ({ parent }) => parent?.theme === true,
    }),
    defineField({
      name: "iconLight",
      title: "Ícone (Light Mode)",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Ícone exibido no tema claro",
      hidden: ({ parent }) => parent?.theme !== true,
    }),
    defineField({
      name: "iconDark",
      title: "Ícone (Dark Mode)",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Ícone exibido no tema escuro",
      hidden: ({ parent }) => parent?.theme !== true,
    }),
    defineField({
      name: "order",
      title: "Ordem de Exibição",
      type: "number",
      description: "Menor número = aparece primeiro",
    }),
  ],
  orderings: [
    {
      title: "Ordem de Exibição",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Nome (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "categories",
      media: "icon",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: Array.isArray(subtitle) ? subtitle.join(", ") : "",
      };
    },
  },
});
