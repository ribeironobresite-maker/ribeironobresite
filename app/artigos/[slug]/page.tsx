import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { getAllSlugs, getPostBySlug, formatDate } from "@/lib/posts";

type Params = { slug: string };

export async function generateStaticParams() {
  // Em build (especialmente sem DATABASE_URL configurada), retorna [] e
  // deixa todas as rotas serem renderizadas on-demand. Em produção com DB
  // OK, retorna a lista pra pré-gerar. force-dynamic no layout garante que
  // mudanças no DB sejam refletidas mesmo nas páginas pré-geradas.
  try {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (err) {
    console.warn("[artigos/[slug]] generateStaticParams sem DB:", err);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="py-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/artigos"
          className="text-sm inline-flex items-center gap-2 mb-8 hover:opacity-70 text-dark"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar para os artigos
        </Link>

        <div className="text-xs uppercase tracking-widest text-accent mb-3">
          {post.category}
        </div>
        <h1
          className="font-serif text-3xl md:text-4xl leading-tight mb-4"
          style={{ color: "var(--bg-dark)" }}
        >
          {post.title}
        </h1>
        <div className="text-sm mb-10 text-dark" style={{ opacity: 0.6 }}>
          Publicado em {formatDate(post.date)} · {post.readingTime} de leitura ·
          Por {post.author}
        </div>

        {post.cover ? (
          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-12 relative">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.3) 100%)",
              }}
            />
          </div>
        ) : null}

        <div className="prose-custom">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-16 p-8 bg-dark text-light rounded-2xl text-center">
          <h2 className="font-serif text-2xl mb-3">Tem dúvidas sobre o seu caso?</h2>
          <p className="text-light-soft mb-6">
            Converse diretamente com o advogado pelo WhatsApp.
          </p>
          <WhatsAppCTA className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-full font-semibold">
            Falar no WhatsApp
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </WhatsAppCTA>
        </div>
      </div>
    </article>
  );
}
