"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// CORRECCIÓN AQUÍ: Quitamos "blog." del inicio de las keys
const blogPosts = [
  {
    id: 1,
    image: "/images/imge.jpg", 
    authorKey: "Elena Vórtice",
    date: "2024-07-15",
    titleKey: "posts.1.title",    // ✅ Antes: "blog.posts.1.title"
    excerptKey: "posts.1.excerpt", // ✅ Antes: "blog.posts.1.excerpt"
    slug: "del-dato-a-la-decision"
  },
  {
    id: 2,
    image: "/images/imge.jpg",
    authorKey: "Dr. Aris Thorne",
    date: "2024-07-10",
    titleKey: "posts.2.title",
    excerptKey: "posts.2.excerpt",
    slug: "cloud-ia-duo-perfecto"
  },
  {
    id: 3,
    image: "/images/imge.jpg",
    authorKey: "Sofía Reyes",
    date: "2024-07-01",
    titleKey: "posts.3.title",
    excerptKey: "posts.3.excerpt",
    slug: "post-3-slug"
  }
];

export default function Blog() {
  // 't' ya apunta a "Herot.blog"
  const t = useTranslations("Herot.blog");

  return (
    <section 
      className="py-24 bg-[#18181b] relative overflow-hidden" 
      suppressHydrationWarning={true}
    >
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Cabecera Centrada */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
            {t('description')}
          </p>
        </div>

        {/* Grid de Posts */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.id}
              className="group flex flex-col bg-[#0F0F0F] border border-white/10 rounded-2xl overflow-hidden hover:border-altum-aqua/50 hover:shadow-2xl transition-all duration-300"
            >
              {/* Imagen */}
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={post.image}
                  // t("posts.1.title") -> Resuelve: Herot.blog.posts.1.title (CORRECTO)
                  alt={t(post.titleKey)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4 uppercase tracking-wider font-medium">
                  <span>{post.authorKey}</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-altum-aqua transition-colors line-clamp-2 leading-tight">
                  {t(post.titleKey)}
                </h3>

                <p className="text-sm text-gray-400 line-clamp-3 mb-6 font-light leading-relaxed flex-grow">
                  {t(post.excerptKey)}
                </p>

                <div className="flex items-center text-altum-aqua text-sm font-bold mt-auto group/btn">
                  {t('readMore')} 
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            {t('viewAll')}
          </Link>
        </div>

      </div>
    </section>
  );
}