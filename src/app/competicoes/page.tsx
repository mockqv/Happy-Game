import { TrophyIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Tournament = {
  id: number;
  name: string;
  prizepool: string | null;
  begin_at: string;
  end_at: string;
  league: {
    name: string;
    image_url: string | null;
  };
  videogame: {
    name: string;
  };
};

async function getTournaments() {
  const token = process.env.PANDASCORE_API_TOKEN;
  const res = await fetch('https://api.pandascore.co/tournaments/upcoming?sort=-begin_at&per_page=15', {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch tournaments');
  return res.json() as Promise<Tournament[]>;
}

export default async function CompeticoesPage() {
  const tournaments = await getTournaments();

  return (
    <div className="w-full">
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <TrophyIcon className="h-12 w-12 mx-auto text-sky-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Competições e Torneios</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Acompanhe os próximos torneios dos maiores palcos de eSports.</p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {tournaments.map((tour) => (
              <Link href={`/competicoes/${tour.id}`} key={tour.id} className="block p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:-translate-y-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-center gap-4">
                      <img src={tour.league.image_url ?? 'https://placehold.co/40x40/1e293b/ffffff?text=L'} alt={tour.league.name} className="h-10 w-10 rounded-full" />
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{tour.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{tour.league.name} - {tour.videogame.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-lg font-bold text-sky-600 dark:text-sky-400">{tour.prizepool ?? 'Não anunciado'}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{new Date(tour.begin_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}