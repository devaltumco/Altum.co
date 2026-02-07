/* eslint-disable @typescript-eslint/no-unused-vars */
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { client } from "@/lib/sanity.client";
import BlogIndex from "@/components/pages/BlogIndex";

// 1. QUERY DE SANITY ACTUALIZADA (Agregamos category y description)
const postsQuery = `
  *[_type == "post" && language == $locale] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    category,    
    description  
  }
`;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  let t;
  try {
    t = await getTranslations({ locale, namespace: "MetadataBlog" });
  } catch (error) {
    return { title: "Blog Altum" };
  }

  const base = new URL("http://localhost:3002");
  const canonicalUrl = locale === "es" 
    ? new URL("/blog", base).toString() 
    : new URL("/en/blog", base).toString();

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords")?.split(","),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: new URL("/en/blog", base).toString(),
        es: new URL("/blog", base).toString(),
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;

  let BlogMessages;
  try {
    BlogMessages = (await import(`../../../../messages/${locale}/Blog.json`)).default;
  } catch (error) {
    BlogMessages = { Blog: { title: "Blog", empty: "Error loading translations" } };
  }

  let posts = [];
  try {
    posts = await client.fetch(postsQuery, { locale });
  } catch (error) {
    console.error("🔴 ERROR SANITY:", error);
  }

  const pageMessages = {
    ...BlogMessages,
  };

  return (
    <NextIntlClientProvider locale={locale} messages={pageMessages}>
      <main className="w-full min-w-full max-w-none m-0 p-0">
        <BlogIndex posts={posts} locale={locale} />
      </main>
    </NextIntlClientProvider>
  );
}