import { notFound } from 'next/navigation';
import { TrophyIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Tournament = {
  id: number;
  name: string;
  prizepool: string | null;
  begin_at: string;
  league: { name: string; image_url: string | null; };
  videogame: { name: string; };
  teams: { name: string; image_url: string | null }[];
};

async function getTournament(id: string) {
  const token = process.env.PANDASCORE_API_TOKEN;
  const res = await fetch(`https://api.pandascore.co/tournaments/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return undefined;
  return res.json() as Promise<Tournament>;
}

export default async function CompeticaoDetalhePage({ params }: { params: { id: string } }) {
  const tournament = await getTournament(params.id);
  if (!tournament) {
    notFound();
  }

  return (
    <div className="w-full">
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <img src={tournament.league.image_url ?? undefined} alt={tournament.league.name} className="h-20 w-20 mx-auto rounded-full mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">{tournament.name}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {tournament.league.name} - {tournament.videogame.name}
          </p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-2xl font-bold mb-6 text-center">Equipas Participantes</h3>
          {tournament.teams.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {tournament.teams.map(team => (
                <div key={team.name} className="flex flex-col items-center text-center p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
                  <img src={team.image_url ?? 'https://placehold.co/80x80/1e293b/ffffff?text=T'} alt={team.name} className="h-20 w-20 rounded-full mb-2" />
                  <p className="font-semibold text-sm">{team.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">A lista de equipas ainda não foi anunciada.</p>
          )}
          <div className="text-center mt-16">
            <Link href="/competicoes" className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline">
              &larr; Ver todas as competições
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
