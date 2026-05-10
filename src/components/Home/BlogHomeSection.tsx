// src/components/Home/BlogHomeSection.tsx
import { client } from "@/lib/sanity.client";
import BlogIndex from "@/components/pages/BlogIndex";

export default async function BlogHomeSection({ locale }: { locale: string }) {
  const recentPostsQuery = `
    *[_type == "post" && language == $locale] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      category,    
      description  
    }
  `;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let posts: any[] = [];
  try {
    posts = (await client.fetch(recentPostsQuery, { locale })) || [];
  } catch (error) {
    console.error("🔴 ERROR SANITY:", error);
  }

  // Retorna el componente ya armado
  return <BlogIndex posts={posts} locale={locale} isHome={true} />;
}