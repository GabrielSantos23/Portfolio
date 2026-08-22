import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experiência",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Nome da Empresa",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyLogo",
      title: "Logo da Empresa",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "companyLogoUrl",
      title: "Logo da Empresa (URL externa)",
      type: "url",
      description:
        "URL externa para o logo. Usado caso não queira fazer upload direto no Sanity",
    }),
    defineField({
      name: "isCurrentEmployer",
      title: "Empregador Atual?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordem de Exibição",
      type: "number",
      description: "Menor número = aparece primeiro",
    }),
    defineField({
      name: "positions",
      title: "Cargos",
      type: "array",
      of: [
        {
          type: "object",
          name: "position",
          title: "Cargo",
          fields: [
            defineField({
              name: "title",
              title: "Título do Cargo",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "employmentPeriodStart",
              title: "Início",
              type: "string",
              description: "Ex: 10.2022, 2020",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "employmentPeriodEnd",
              title: "Fim",
              type: "string",
              description:
                "Ex: 12.2023, 2022. Deixe vazio se for o cargo atual",
            }),
            defineField({
              name: "employmentType",
              title: "Tipo de Trabalho",
              type: "string",
              options: {
                list: [
                  { title: "Full-time", value: "Full-time" },
                  { title: "Part-time", value: "Part-time" },
                  { title: "Freelance", value: "Freelance" },
                  { title: "Internship", value: "Internship" },
                  { title: "Contract", value: "Contract" },
                ],
              },
            }),
            defineField({
              name: "icon",
              title: "Ícone",
              type: "string",
              options: {
                list: [
                  { title: "Code", value: "code" },
                  { title: "Design", value: "design" },
                  { title: "Education", value: "education" },
                  { title: "Business", value: "business" },
                  { title: "Idea", value: "idea" },
                ],
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
              name: "skills",
              title: "Skills",
              type: "array",
              of: [{ type: "string" }],
              options: {
                layout: "tags",
              },
            }),
            defineField({
              name: "isExpanded",
              title: "Expandido por padrão?",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "employmentType",
            },
          },
        },
      ],
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
      title: "companyName",
      subtitle: "isCurrentEmployer",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? "Empregador Atual" : "",
      };
    },
  },
});
