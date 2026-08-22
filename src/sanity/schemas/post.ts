import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
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
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
      description: "Breve resumo do post para SEO e preview",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagem de Capa",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageUrl",
      title: "Imagem de Capa (URL externa)",
      type: "url",
      description:
        "URL externa para a imagem. Usado caso não queira fazer upload direto no Sanity",
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Tutorial", value: "tutorial" },
          { title: "Component", value: "component" },
          { title: "Project", value: "project" },
        ],
      },
    }),
    defineField({
      name: "isNew",
      title: "É Novo?",
      type: "boolean",
      initialValue: false,
      description: "Marca o post como novo com um badge",
    }),
    defineField({
      name: "content",
      title: "Conteúdo (MDX)",
      type: "text",
      rows: 30,
      description:
        "Conteúdo do post em formato MDX/Markdown. Para rich text nativo do Sanity, use o campo 'body' abaixo.",
    }),
    defineField({
      name: "body",
      title: "Conteúdo (Rich Text)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                  },
                  {
                    name: "blank",
                    title: "Abrir em nova aba",
                    type: "boolean",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Texto Alternativo",
              type: "string",
              description: "Importante para acessibilidade e SEO",
            },
            {
              name: "caption",
              title: "Legenda",
              type: "string",
            },
          ],
        },
        {
          type: "code",
          title: "Code Block",
          options: {
            withFilename: true,
          },
        },
      ],
      description:
        "Conteúdo do post usando Portable Text (editor rico do Sanity). Alternativa ao campo MDX acima.",
    }),
    defineField({
      name: "createdAt",
      title: "Data de Criação",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Data de Atualização",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Data de Criação (mais recente)",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
