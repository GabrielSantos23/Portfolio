import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Link Social",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Plataforma",
      type: "string",
      description: "Ex: LinkedIn, GitHub, X, Instagram",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição / Username",
      type: "string",
      description: "Ex: @gsantos23, Gabriel Santos",
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ícone",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Ícone da plataforma",
    }),
    defineField({
      name: "iconUrl",
      title: "Ícone URL (externa)",
      type: "url",
      description:
        "URL externa para o ícone. Usado caso não queira fazer upload direto no Sanity",
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
      subtitle: "description",
      media: "icon",
    },
  },
});
