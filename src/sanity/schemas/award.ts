import { defineField, defineType } from "sanity";

export const award = defineType({
  name: "award",
  title: "Prêmio",
  type: "document",
  fields: [
    defineField({
      name: "prize",
      title: "Prêmio",
      type: "string",
      description: "Ex: 1st Prize, Bronze Medal, Consolation Prize",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Título do Concurso/Competição",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "string",
      description: "Formato: YYYY-MM (ex: 2022-11)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "grade",
      title: "Nível/Grau",
      type: "string",
      description: "Ex: Grade 8, Grade 12, University",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 4,
      description: "Suporta Markdown",
    }),
    defineField({
      name: "referenceLink",
      title: "Link de Referência",
      type: "url",
      description: "Link para certificado/comprovante",
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
      by: [{ field: "date", direction: "desc" }],
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
      subtitle: "prize",
    },
    prepare({ title, subtitle }) {
      return {
        title: `${subtitle} — ${title}`,
      };
    },
  },
});
