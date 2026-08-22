import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projeto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "periodStart",
      title: "Início",
      type: "string",
      description: "Ex: 05.2025, 01.2022",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "periodEnd",
      title: "Fim",
      type: "string",
      description: "Ex: 07.2023. Deixe vazio se o projeto está ativo",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "URL do projeto (website, GitHub, vídeo, etc.)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "skills",
      title: "Skills / Tecnologias",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 6,
      description: "Suporta Markdown",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "logoUrl",
      title: "Logo URL (externa)",
      type: "url",
      description:
        "URL externa para o logo. Usado caso não queira fazer upload direto no Sanity",
    }),
    defineField({
      name: "isExpanded",
      title: "Expandido por padrão?",
      type: "boolean",
      initialValue: false,
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "periodStart",
      media: "logo",
    },
  },
});
