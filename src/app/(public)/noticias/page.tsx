import { NewspaperIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Game = {
  id: number;
  name: string;
  background_image: string;
  metacritic: number;
  parent_platforms: { platform: { name: string } }[];
};

async function getGames() {
  const apiKey = process.env.RAWG_API_KEY;
  const res = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page_size=12`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error('Failed to fetch games');
  const data = await res.json();
  return data.results as Game[];
}

export default async function NoticiasPage() {
  const games = await getGames();

  return (
    <div className="w-full">
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <NewspaperIcon className="h-12 w-12 mx-auto text-sky-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Jogos em Destaque</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Explore os jogos mais populares e aclamados do momento.</p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <Link href={`/noticias/${game.id}`} key={game.id} className="group block bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800">
                <img src={game.background_image} alt={`Imagem de ${game.name}`} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {game.parent_platforms.map(p => p.platform.name).join(', ')}
                    </span>
                    {game.metacritic && <span className="text-sm font-bold text-green-500 border border-green-500/50 rounded-md px-2 py-1">{game.metacritic}</span>}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-500 transition-colors">{game.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
