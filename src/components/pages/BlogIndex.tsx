'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity.image';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any;
  publishedAt: string;
  category?: string;     
  description?: string;  
}

interface Props {
  posts: Post[];
  locale: string;
}

export default function BlogIndex({ posts, locale }: Props) {
  const t = useTranslations('Blog');

  return (
    <section className="w-full py-16 mt-14 bg-[#0a0a0a]">
      <div className="container px-4 mx-auto">
        
        <div className="mb-7">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-[family-name:var(--font-audiowide)]">
            {t('title')}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            {t('subtitle')}
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {posts.map((post) => (
              <article key={post._id} className="group flex flex-col h-full">
                
                {/* 1. IMAGEN (Estilo tarjeta oscura con borde sutil) */}
                <Link 
                  href={`/${locale}/blog/${post.slug.current}`} 
                  className="block overflow-hidden rounded-2xl mb-5 bg-slate-900 border border-slate-800 aspect-[16/9] relative shadow-lg shadow-black/50"
                >
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </Link>
                
                {/* 2. CONTENIDO */}
                <div className="flex flex-col flex-1">
                  
                  {/* Metadata: Fecha • CATEGORIA */}
                  <div className="flex items-center text-xs font-bold text-slate-400 mb-3 tracking-wide uppercase">
                    <span suppressHydrationWarning>
                      {new Date(post.publishedAt).toLocaleDateString(locale, {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                    {post.category && (
                      <>
                        <span className="mx-2 text-slate-700">•</span>
                        <span className="text-altum-aqua">
                          {post.category}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Título */}
                  <Link href={`/${locale}/blog/${post.slug.current}`}>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-altum-aqua transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  {/* Descripción / Extracto */}
                  {post.description && (
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.description}
                    </p>
                  )}

                  {/* Leer más (Siempre visible o como fallback) */}
                  <div className="mt-auto pt-2">
                     <Link 
                        href={`/${locale}/blog/${post.slug.current}`}
                        className="text-sm font-semibold text-altum-aqua hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                       {t('readMore')} →
                     </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <p className="text-xl text-slate-500">{t('empty')}</p>
          </div>
        )}
      </div>
    </section>
  );
}