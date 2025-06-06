import { UsersIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Player = {
  id: number;
  name: string;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
  role: string | null;
  current_team: {
    name: string | null;
  } | null;
};

async function getPlayers() {
  const token = process.env.PANDASCORE_API_TOKEN;
  const res = await fetch('https://api.pandascore.co/valorant/players?sort=-name&per_page=20', {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch players');
  return res.json() as Promise<Player[]>;
}

export default async function JogadoresPage() {
  const players = await getPlayers();

  return (
    <div className="w-full">
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <UsersIcon className="h-12 w-12 mx-auto text-sky-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Estrelas dos eSports</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Conheça os perfis e carreiras dos melhores jogadores do mundo.</p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {players.map((player) => (
              <Link href={`/jogadores/${player.id}`} key={player.id} className="group text-center">
                <div className="relative">
                  <img src={player.image_url ?? `https://placehold.co/400x400/1e293b/ffffff?text=${player.name[0]}`} alt={`Foto de ${player.name}`} className="w-full rounded-full aspect-square object-cover border-4 border-slate-200 dark:border-slate-800 group-hover:border-sky-500 transition-all duration-300" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-slate-100">{player.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{player.current_team?.name ?? 'Sem Equipa'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}