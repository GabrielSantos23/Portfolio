import fs from "node:fs";
import path from "path";
import matter from "gray-matter";

interface Post {
  title: string;
  description: string;
  image?: string;
  category: string;
  new?: boolean;
  createdAt: string;
  updatedAt: string;
  content: string;
  slug: string;
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string): { metadata: Post; content: string } {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);
  return {
    metadata: data as Post,
    content,
  };
}

function getPosts(dir: string): Post[] {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      ...metadata,
      slug,
      content,
    };
  });
}

function generatePostsNdjson() {
  const postsDir = path.join(process.cwd(), "src", "content", "blog");
  const posts = getPosts(postsDir);

  console.log(`Found ${posts.length} blog posts\n`);

  let ndjson = "";

  for (const post of posts) {
    // Convert date strings to ISO format for Sanity
    const createdAt = new Date(post.createdAt).toISOString();
    const updatedAt = new Date(post.updatedAt).toISOString();

    ndjson +=
      JSON.stringify({
        _type: "post",
        title: post.title,
        slug: { _type: "slug", current: post.slug },
        description: post.description,
        imageUrl: post.image,
        category: post.category,
        isNew: post.new || false,
        content: post.content,
        createdAt,
        updatedAt,
      }) + "\n";

    console.log(`- ${post.title} (${post.slug})`);
  }

  fs.writeFileSync("migration-posts.ndjson", ndjson);
  console.log("\nDone! Created migration-posts.ndjson");
}

generatePostsNdjson();
