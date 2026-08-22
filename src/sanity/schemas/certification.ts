import { defineField, defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certificação",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título da Certificação",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Emissor",
      type: "string",
      description: "Ex: Vercel, Google, Meta, Microsoft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuerLogo",
      title: "Logo do Emissor",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "issuerLogoUrl",
      title: "Logo do Emissor (URL externa)",
      type: "url",
      description:
        "URL externa para o logo do emissor. Usado caso não queira fazer upload direto no Sanity",
    }),
    defineField({
      name: "issuerIconName",
      title: "Nome do Ícone do Emissor",
      type: "string",
      description:
        "Nome do ícone para o emissor (ex: vercel, google, meta, microsoft, coursera, accenture)",
    }),
    defineField({
      name: "issueDate",
      title: "Data de Emissão",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "credentialID",
      title: "ID da Credencial",
      type: "string",
    }),
    defineField({
      name: "credentialURL",
      title: "URL da Credencial",
      type: "url",
      description: "Link para verificar a certificação",
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
      title: "Data (mais recente primeiro)",
      name: "dateDesc",
      by: [{ field: "issueDate", direction: "desc" }],
    },
    {
      title: "Ordem de Exibição",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "issuer",
      media: "issuerLogo",
    },
  },
});
