import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ViewTracker } from '@/components/analytics/ViewTracker';

type Game = {
  id: number;
  name: string;
  description_raw: string;
  background_image: string;
  website: string;
  metacritic: number;
  released: string;
  developers: { name: string }[];
};

async function getGame(id: string) {
  const apiKey = process.env.RAWG_API_KEY;
  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
  if (!res.ok) return undefined;
  return res.json() as Promise<Game>;
}

export default async function NoticiaDetalhePage({ params }: { params: { id: string } }) {
  const game = await getGame(params.id);

  if (!game) {
    notFound();
  }

  return (
    <div className="w-full">
       <div
        className="h-96 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${game.background_image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
      </div>
      <article className="container mx-auto px-4 -mt-48 relative z-10 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              {game.name}
            </h1>
          </div>
          <div className="prose dark:prose-invert prose-lg max-w-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <h3>Sobre o Jogo</h3>
            <p>{game.description_raw}</p>
            <a href={game.website} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
              Visitar site oficial &rarr;
            </a>
          </div>
          <div className="text-center mt-12">
             <Link href="/noticias" className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline">
              &larr; Ver todos os jogos
            </Link>
          </div>
        </div>
      </article>
      <ViewTracker documentId={params.id} documentType="game" documentName={game.name} />
    </div>
  );
}