/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogActionBar from '@/components/BlogActionBar';
import { client } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity.image';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

// --- HELPERS ---

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getSpotifyEmbedUrl = (url: string) => {
  if (url.includes('open.spotify.com/episode')) {
    return url.replace('/episode/', '/embed/episode/');
  }
  return null;
};

// --- COMPONENTES PORTABLE TEXT ---
const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-10 w-full">
          <div className="relative w-full h-auto aspect-video rounded-xl overflow-hidden shadow-sm bg-[#262626]">
            <Image 
              src={urlFor(value).url()} 
              alt={value.alt || 'Imagen del artículo'} 
              fill
              className="object-cover"
            />
          </div>
          {value.caption && <figcaption className="text-center text-sm text-[#D7D7D7] mt-3 italic">{value.caption}</figcaption>}
        </figure>
      );
    },
    youtube: ({ value }: any) => {
      if (!value.url) return null;
      const id = getYouTubeId(value.url);
      return (
        <iframe 
          className="w-full aspect-video rounded-xl my-10 shadow-lg border border-[#262626]" 
          src={`https://www.youtube.com/embed/${id}`} 
          allowFullScreen 
          title="YouTube Video" 
          suppressHydrationWarning={true}
        />
      );
    },
    myTable: ({ value }: any) => {
      const { rows } = value;
      if (!rows || rows.length === 0) return null;
      const [head, ...body] = rows;

      return (
        <div className="my-10 overflow-x-auto rounded-xl border border-[#262626] shadow-sm bg-[#000000]">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-[#D7D7D7] uppercase bg-[#262626] border-b border-[#262626]">
              <tr>
                {head.cells.map((cell: string, i: number) => (
                  <th key={i} className="px-6 py-4 font-bold">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626] bg-[#000000]">
              {body.map((row: any, i: number) => (
                <tr key={i} className="hover:bg-[#262626]/50 transition-colors">
                  {row.cells.map((cell: string, j: number) => (
                    <td key={j} className="px-6 py-4 text-[#D7D7D7]">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    podcast: ({ value }: any) => {
      if (!value.url) return null;
      const spotifyEmbed = getSpotifyEmbedUrl(value.url);
      
      return (
        <div className="my-10 p-6 bg-[#262626] rounded-2xl text-white border border-[#5D3FD3]/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl text-[#3AF2CE]">🎧</span>
            <h3 className="font-bold text-lg">Audio</h3>
          </div>
          {spotifyEmbed ? (
            <iframe style={{ borderRadius: '12px' }} src={spotifyEmbed} width="100%" height="152" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          ) : (
            <audio controls className="w-full"><source src={value.url} type="audio/mpeg" />Tu navegador no soporta audio.</audio>
          )}
        </div>
      );
    },
    infoBox: ({ value }: any) => {
      const styles: Record<string, string> = {
        tip: "bg-[#262626] border-[#5D3FD3] text-[#D7D7D7]",
        info: "bg-[#262626] border-[#3AF2CE] text-[#D7D7D7]",
        success: "bg-[#262626] border-emerald-500 text-[#D7D7D7]"
      };
      const currentStyle = styles[value.variant] || styles.info;
      return (
        <div className={`p-6 my-8 rounded-xl border-l-4 ${currentStyle} shadow-md`}>
          {value.title && <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
             {value.variant === 'tip' && '💡'} 
             {value.variant === 'success' && '🚀'} 
             {value.variant === 'info' && 'ℹ️'} 
             <span className="text-white">{value.title}</span>
          </h4>}
          <p className="text-base opacity-90">{value.content}</p>
        </div>
      );
    }
  },
  block: {
    h2: ({ value, children }: any) => {
      const text = value.children?.map((child: any) => child.text).join('') || '';
      const id = slugify(text);
      return (
        <h2 id={id} className="text-2xl md:text-3xl font-bold mt-12 mb-4 text-white scroll-mt-32 border-b border-[#262626] pb-2">
          {children}
        </h2>
      );
    },
    h3: ({ value, children }: any) => {
      const text = value.children?.map((child: any) => child.text).join('') || '';
      const id = slugify(text);
      return (
        <h3 id={id} className="text-xl font-bold mt-8 mb-3 text-[#3AF2CE] scroll-mt-32">
          {children}
        </h3>
      );
    },
    normal: ({ children }: any) => <p className="mb-5 text-lg leading-8 text-[#D7D7D7]">{children}</p>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-[#3AF2CE] pl-6 py-2 my-8 italic text-xl bg-[#262626] text-[#D7D7D7]">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-6 mb-6 space-y-2 text-lg text-[#D7D7D7] marker:text-[#3AF2CE]">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-6 mb-6 space-y-2 text-lg text-[#D7D7D7] marker:text-[#5D3FD3]">{children}</ol>,
  }
};

// --- QUERIES ---
const query = `
  *[_type == "post" && slug.current == $slug && language == $locale][0] {
    title, mainImage, publishedAt, content, category,
    "slug": slug.current,
    "translationSlug": translation->slug.current, 
    "translationLang": translation->language,
    author { name, role, bio, image },
    secondaryImage,
    podcastUrl, 
    videoUrl
  }
`;

const recoveryQuery = `*[_type == "post" && slug.current == $slug][0] { language, "translationSlug": translation->slug.current, "translationLang": translation->language }`;

type Props = { params: Promise<{ slug: string; locale: string }> };

// --- PÁGINA PRINCIPAL ---
export default async function PostPage({ params }: Props) {
  const { slug, locale } = await params;
  const post = await client.fetch(
      query, 
      { slug, locale }, 
      { next: { revalidate: 259200 } } 
    );

  let messages;
  try {
    messages = (await import(`../../../../../messages/${locale}/Blog.json`)).default;
  } catch (error) {
    console.error("Error loading JSON:", error);
    messages = { 
      Post: { summarize: "Resumir", share: "Share", prompt: "Summarize: ", writtenBy: "Written by", toc: "TOC", listen: "Escuchar", video: "Video" },
      Sidebar: { title1: "Web", title2: "Pro", features: {}, badge: "New" }
    };
  }

  const tPost = messages.Post;

  if (!post) {
    const sibling = await client.fetch(recoveryQuery, { slug });
    if (sibling && sibling.translationLang === locale && sibling.translationSlug) {
      redirect(`/${locale}/blog/${sibling.translationSlug}`);
    }
    notFound();
  }

  const headings = post.content?.filter((block: any) => block.style === 'h2').map((block: any) => {
    const text = block.children.map((child: any) => child.text).join('');
    return {
      text: text,
      id: slugify(text)
    };
  }) || [];
  
  const currentUrl = `https://zipaquiradigital.com/${locale}/blog/${slug}`;
  const spotifyEmbed = post.podcastUrl ? getSpotifyEmbedUrl(post.podcastUrl) : null;

  return (
    <div className="bg-[#000000] min-h-screen font-sans pt-20 text-[#D7D7D7]">
      
      {/* HEADER HERO */}
      <div className="container mx-auto px-4 max-w-5xl pt-12 pb-6">
        <div className="flex flex-wrap items-center gap-4 text-sm font-bold tracking-wide uppercase text-[#D7D7D7] mb-6">
          <span className="bg-[#262626] text-[#3AF2CE] px-3 py-1 rounded-full text-xs border border-[#3AF2CE]/20">{post.category || 'Blog'}</span>
          <span className="text-[#262626]">•</span>
           <span suppressHydrationWarning className="text-[#D7D7D7]/80">
            {new Date(post.publishedAt).toLocaleDateString(locale, { dateStyle: 'long' })}
          </span>          
          {post.author && (
            <>
              <span className="text-[#262626]">•</span>
              <span className="text-white">{post.author.name}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight font-[family-name:var(--font-audiowide)]">
          {post.title}
        </h1>

      <BlogActionBar 
          promptText={tPost.prompt}
          currentUrl={currentUrl}
          tSummarize={tPost.summarize}
          tShare={tPost.share}
        />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <main className="lg:col-span-8">
            {post.mainImage && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl mb-10 bg-[#262626] border border-[#262626]">
                <Image src={urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover" priority />
              </div>
            )}

            {/* TABLA DE CONTENIDOS AUTOMÁTICA */}
            {headings.length > 0 && (
              <div className="bg-[#262626] p-6 rounded-xl border border-[#262626] mb-10 shadow-inner">
                <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#3AF2CE] rounded-full"></span>
                  {tPost.toc}
                </h3>
                <ul className="space-y-3">
                  {headings.map((h: any, i: number) => (
                    <li key={i}>
                      <a href={`#${h.id}`} className="text-[#D7D7D7] hover:text-[#3AF2CE] hover:underline transition-all text-base flex items-start gap-2">
                        <span className="text-[#5D3FD3] font-bold">0{i+1}.</span> {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-a:text-[#3AF2CE] prose-strong:text-white prose-img:rounded-xl">
              <PortableText value={post.content} components={components} />
            </div>

            {/* SEGUNDA IMAGEN */}
            {post.secondaryImage && (
              <figure className="my-12">
                 <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg bg-[#262626] border border-[#262626]">
                    <Image src={urlFor(post.secondaryImage).url()} alt="Imagen adicional" fill className="object-cover" />
                 </div>
                 <figcaption className="text-center text-sm text-[#D7D7D7] mt-2 italic">Detalle adicional</figcaption>
              </figure>
            )}

            {/* REPRODUCTOR DE PODCAST */}
            {post.podcastUrl && (
              <div className="my-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#5D3FD3] rounded-full flex items-center justify-center text-white shadow-lg">🎧</div>
                  <h3 className="font-bold text-xl text-white">{tPost.listen}</h3>
                </div>
                
                {spotifyEmbed ? (
                  <iframe style={{ borderRadius: '12px' }} src={spotifyEmbed} width="100%" height="152" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                ) : (
                  <div className="p-4 bg-[#262626] rounded-xl border border-[#262626]">
                    <audio controls className="w-full">
                      <source src={post.podcastUrl} type="audio/mpeg" />
                      Tu navegador no soporta audio.
                    </audio>
                  </div>
                )}
              </div>
            )}

            {/* VIDEO DE YOUTUBE DESTACADO */}
            {post.videoUrl && (
              <div className="my-12">
                 <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                   <span className="w-1 h-6 bg-[#5D3FD3] rounded-full"></span>
                   {tPost.video}
                 </h3>
                 <iframe 
                   className="w-full aspect-video rounded-xl shadow-2xl border border-[#262626]" 
                   src={`https://www.youtube.com/embed/${getYouTubeId(post.videoUrl)}`} 
                   title="Video destacado"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen 
                   suppressHydrationWarning={true}
                 />
              </div>
            )}

            {/* AUTOR */}
            {post.author && (
              <div className="mt-16 p-8 bg-[#262626] rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left border border-[#5D3FD3]/20 shadow-xl">
                {post.author.image && (
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-full overflow-hidden border-2 border-[#5D3FD3] shadow-lg">
                     <Image src={urlFor(post.author.image).url()} alt={post.author.name} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-xl text-white mb-1 font-[family-name:var(--font-audiowide)]">
                    {tPost.writtenBy} <span className="text-[#3AF2CE]">{post.author.name}</span>
                  </h4>
                  <p className="text-xs font-bold text-[#5D3FD3] uppercase tracking-widest mb-3">{post.author.role}</p>
                  <p className="text-[#D7D7D7] text-sm leading-relaxed">{post.author.bio}</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}