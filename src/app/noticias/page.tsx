import { NewspaperIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const newsArticles = [
  {
    id: 1,
    category: 'Atualizações',
    title: 'Novo patch de balanceamento agita o meta competitivo',
    description: 'A última atualização trouxe mudanças significativas para vários heróis, com a comunidade a debater o novo estado do jogo.',
    date: '6 de junho de 2025',
    imageUrl: 'https://placehold.co/600x400/1e293b/ffffff?text=Patch+Notes',
  },
  {
    id: 2,
    category: 'eSports',
    title: 'Equipa "Dragões Alados" vence o campeonato de verão',
    description: 'Após uma final emocionante de cinco jogos, os Dragões Alados levantam o troféu e garantem a sua vaga no mundial.',
    date: '5 de junho de 2025',
    imageUrl: 'https://placehold.co/600x400/1e293b/ffffff?text=Campeonato',
  },
  {
    id: 3,
    category: 'Comunidade',
    title: 'Evento de caridade da comunidade arrecada valor recorde',
    description: 'Streamers e jogadores uniram-se num evento de 24 horas para apoiar uma causa nobre, mostrando a força da comunidade gamer.',
    date: '4 de junho de 2025',
    imageUrl: 'https://placehold.co/600x400/1e293b/ffffff?text=Evento',
  },
];

export default function NoticiasPage() {
  return (
    <div className="w-full">
      {/* Cabeçalho da Página */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <NewspaperIcon className="h-12 w-12 mx-auto text-sky-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Últimas Notícias
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Mantenha-se atualizado com tudo o que acontece no universo dos eSports e dos seus jogos favoritos.
          </p>
        </div>
      </section>

      {/* Grelha de Notícias */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Link href={`/noticias/${article.id}`} key={article.id} className="group block bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800">
                <img src={article.imageUrl} alt={`Imagem para ${article.title}`} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-sm font-semibold text-sky-600 dark:text-sky-400">{article.category}</span>
                  <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-500 transition-colors">{article.title}</h3>
                  <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">{article.description}</p>
                  <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">{article.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}