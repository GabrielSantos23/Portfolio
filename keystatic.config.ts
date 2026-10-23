import { collection, config, fields, singleton } from "@keystatic/core";

// Paragraphs with links only; used for the bio and the callout boxes.
const richText = (label: string) => fields.document({ label, links: true });
const pageIntro = {
  title: fields.text({ label: "Title" }),
  subtitle: fields.text({ label: "Subtitle" }),
  intro: fields.text({ label: "Intro", multiline: true }),
};

export default config({
  storage: { kind: "local" },
  ui: { brand: { name: "pablofr.com clone" } },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { data: "yaml" },
      columns: ["title", "publishedAt"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        excerpt: fields.text({ label: "Excerpt", multiline: true, validation: { length: { min: 1 } } }),
        publishedAt: fields.datetime({
          label: "Published at",
          description: "Sets the list order; the time breaks ties between posts on the same day.",
          validation: { isRequired: true },
        }),
        updatedAt: fields.date({ label: "Updated on", description: "Shown as “Updated …” when it differs from the publish date." }),
        readTime: fields.integer({ label: "Read time (minutes)", validation: { isRequired: true, min: 1 } }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Article", value: "article" },
            { label: "Code", value: "code" },
            { label: "Art", value: "art" },
            { label: "AI", value: "ai" },
            { label: "Scraping", value: "scraping" },
          ],
          defaultValue: "article",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (p) => p.value }),
        headings: fields.array(
          fields.object({
            level: fields.select({
              label: "Level",
              options: [
                { label: "H2", value: "2" },
                { label: "H3", value: "3" },
              ],
              defaultValue: "2",
            }),
            id: fields.text({ label: "Anchor id on the original article" }),
            text: fields.text({ label: "Text" }),
          }),
          { label: "Sections (table of contents)", itemLabel: (p) => p.fields.text.value },
        ),
        related: fields.array(fields.relationship({ label: "Post", collection: "posts" }), {
          label: "Related articles",
          itemLabel: (p) => p.value ?? "",
        }),
      },
    }),
  },
  singletons: {
    home: singleton({
      label: "Home page",
      path: "content/pages/home/",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Name" }),
        role: fields.text({ label: "Role" }),
        bio: richText("Bio"),
        projectsTitle: fields.text({ label: "Projects heading" }),
        thoughtsTitle: fields.text({ label: "Thoughts heading" }),
        viewAllLabel: fields.text({ label: "“View all” link label" }),
      },
    }),
    blogPage: singleton({
      label: "Thoughts page",
      path: "content/pages/blog",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description", multiline: true }),
      },
    }),
    projectsPage: singleton({
      label: "Projects page",
      path: "content/pages/projects/",
      format: { data: "yaml" },
      schema: { ...pageIntro, listTitle: fields.text({ label: "List heading" }), callout: richText("Callout") },
    }),
    downloadsPage: singleton({
      label: "Downloads page",
      path: "content/pages/downloads/",
      format: { data: "yaml" },
      schema: {
        ...pageIntro,
        resourcesTitle: fields.text({ label: "Resources heading" }),
        emptyText: fields.text({ label: "Text when there are no resources" }),
        callout: richText("Callout"),
      },
    }),
    componentsPage: singleton({
      label: "Componentes page",
      path: "content/pages/components",
      format: { data: "yaml" },
      schema: pageIntro,
    }),
    site: singleton({
      label: "Footer & newsletter",
      path: "content/site",
      format: { data: "yaml" },
      schema: {
        newsletterTitle: fields.text({ label: "Newsletter heading" }),
        newsletterText: fields.text({ label: "Newsletter text", multiline: true }),
        emailPlaceholder: fields.text({ label: "Email placeholder" }),
        subscribeLabel: fields.text({ label: "Subscribe button" }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "URL" }),
            icon: fields.select({
              label: "Icon",
              options: [
                { label: "None", value: "none" },
                { label: "GitHub", value: "github" },
                { label: "Email", value: "mail" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "RSS", value: "rss" },
              ],
              defaultValue: "none",
            }),
          }),
          { label: "Footer links", itemLabel: (p) => p.fields.label.value },
        ),
        musicPlayingLabel: fields.text({ label: "Music label while playing" }),
        musicLastPlayedLabel: fields.text({ label: "Music label for the last played song" }),
        musicIdleText: fields.text({ label: "Music text when nothing is known" }),
        siteName: fields.text({ label: "Name after ©" }),
        locationPrefix: fields.text({ label: "Location prefix" }),
        location: fields.text({ label: "Location" }),
        locationHref: fields.url({ label: "Location link" }),
        locationSuffix: fields.text({ label: "Location suffix" }),
        timeZone: fields.text({ label: "Clock time zone (IANA)", description: "For example Europe/Madrid." }),
      },
    }),
    certifications: singleton({
      label: "Certificações",
      path: "content/certifications",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Section heading" }),
        collegesTitle: fields.text({ label: "Colleges heading" }),
        colleges: fields.array(
          fields.object({
            name: fields.text({ label: "Degree / program" }),
            institution: fields.text({ label: "Institution" }),
            period: fields.text({ label: "Period", description: "For example 2020 – 2024." }),
            url: fields.url({ label: "Link (optional)" }),
          }),
          { label: "Colleges", itemLabel: (p) => p.fields.name.value },
        ),
        coursesTitle: fields.text({ label: "Courses heading" }),
        courses: fields.array(
          fields.object({
            name: fields.text({ label: "Course" }),
            issuer: fields.text({ label: "Issuer" }),
            date: fields.text({ label: "Date", description: "For example 2024." }),
            url: fields.url({ label: "Certificate link (optional)" }),
          }),
          { label: "Courses", itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),
    projects: singleton({
      label: "Projects",
      path: "content/projects",
      format: { data: "yaml" },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            description: fields.text({ label: "Description", multiline: true }),
            icon: fields.select({
              label: "Icon",
              options: [
                { label: "npm", value: "npm" },
                { label: "GitHub", value: "github" },
              ],
              defaultValue: "github",
            }),
            href: fields.url({ label: "Main link" }),
            secondaryKind: fields.select({
              label: "Secondary link",
              options: [
                { label: "GitHub", value: "Github" },
                { label: "Website", value: "Website" },
              ],
              defaultValue: "Github",
            }),
            secondaryHref: fields.text({ label: "Secondary link URL or path" }),
          }),
          { label: "Projects", itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),
  },
});
