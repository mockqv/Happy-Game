import { CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const newsArticles = [
  { id: 1, category: 'Atualizações', title: 'Novo patch de balanceamento agita o meta competitivo', description: '...', date: '6 de junho de 2025', imageUrl: 'https://placehold.co/1200x600/1e293b/ffffff?text=Patch+Notes', content: 'O patch 5.12, lançado esta manhã, mudou completamente a forma como o jogo é jogado nos níveis mais altos. Heróis como "Aria" e "Brimstone" receberam nerfs significativos, enquanto "Cypher" e "Omen" foram fortalecidos, o que promete diversificar as estratégias das equipas profissionais no próximo torneio major.' },
  { id: 2, category: 'eSports', title: 'Equipa "Dragões Alados" vence o campeonato de verão', description: '...', date: '5 de junho de 2025', imageUrl: 'https://placehold.co/1200x600/1e293b/ffffff?text=Campeonato', content: 'Numa série que ficará para a história, os Dragões Alados derrotaram os seus arqui-rivais, os Titãs do Abismo, por 3-2. O MVP da final foi "Zephyr", cujo desempenho excecional no último mapa foi decisivo para a vitória.' },
];

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    id: article.id.toString(),
  }));
}

export default function NoticiaDetalhePage({ params }: { params: { id: string } }) {
  const article = newsArticles.find(a => a.id.toString() === params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="w-full">
      <article className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho do Artigo */}
          <div className="text-center mb-8">
            <Link href="/noticias" className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline">
              &larr; Voltar para Notícias
            </Link>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              {article.title}
            </h1>
            <div className="mt-6 flex justify-center items-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <TagIcon className="h-5 w-5" />
                <span>{article.category}</span>
              </div>
            </div>
          </div>

          <img src={article.imageUrl} alt={`Imagem para ${article.title}`} className="w-full rounded-2xl shadow-lg mb-12" />

          <div className="prose dark:prose-invert prose-lg max-w-none">
            <p>{article.content}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
