import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Perfil",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "Primeiro Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Sobrenome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayName",
      title: "Nome de Exibição",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "username",
      title: "Username",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gender",
      title: "Gênero",
      type: "string",
      options: {
        list: [
          { title: "Masculino", value: "male" },
          { title: "Feminino", value: "female" },
          { title: "Outro", value: "other" },
        ],
      },
    }),
    defineField({
      name: "bio",
      title: "Bio (curta)",
      type: "text",
      rows: 3,
      description: "Uma breve descrição sobre você",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "about",
      title: "Sobre (completo)",
      type: "text",
      rows: 8,
      description: "Descrição completa sobre você, exibida na seção 'Sobre'",
    }),
    defineField({
      name: "flipSentences",
      title: "Frases de Destaque",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Frases que aparecem no efeito flip do header (ex: 'Analista de Sistemas', 'Desenvolvedor de Software')",
    }),
    defineField({
      name: "address",
      title: "Endereço",
      type: "string",
      description: "Ex: Guarujá, São Paulo, Brazil",
    }),
    defineField({
      name: "phoneNumber",
      title: "Telefone (codificado em base64)",
      type: "string",
      description: "Formato E.164, codificado em base64",
    }),
    defineField({
      name: "email",
      title: "Email (codificado em base64)",
      type: "string",
      description: "Email codificado em base64 para proteção contra spam",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "spotifyUrl",
      title: "Spotify URL",
      type: "url",
    }),
    defineField({
      name: "otherWebsites",
      title: "Outros Websites",
      type: "array",
      of: [{ type: "url" }],
    }),
    defineField({
      name: "dateOfBirth",
      title: "Data de Nascimento",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    }),
    defineField({
      name: "jobTitle",
      title: "Cargo Atual",
      type: "string",
      description: "Ex: Software Developer",
    }),
    defineField({
      name: "jobs",
      title: "Empregos Atuais",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Cargo",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "company",
              title: "Empresa",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "website",
              title: "Website da Empresa",
              type: "url",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Foto de perfil",
    }),
    defineField({
      name: "avatarUrl",
      title: "Avatar URL (externo)",
      type: "url",
      description:
        "URL externa para o avatar. Usado caso não queira fazer upload direto no Sanity",
    }),
    defineField({
      name: "ogImage",
      title: "OG Image URL",
      type: "url",
      description: "Imagem para compartilhamento em redes sociais (Open Graph)",
    }),
    defineField({
      name: "keywords",
      title: "Keywords (SEO)",
      type: "text",
      rows: 2,
      description: "Palavras-chave para SEO, separadas por vírgula",
    }),
    defineField({
      name: "dateCreated",
      title: "Data de Criação do Portfolio",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    }),
  ],
  preview: {
    select: {
      title: "displayName",
      subtitle: "jobTitle",
    },
  },
});
