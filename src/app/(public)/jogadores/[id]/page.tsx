import { notFound } from 'next/navigation';
import { HashtagIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ViewTracker } from '@/components/analytics/ViewTracker';

type Player = {
  id: number;
  name: string;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
  role: string | null;
  hometown: string | null;
  current_team: { name: string | null } | null;
};

async function getPlayer(id: string) {
  const token = process.env.PANDASCORE_API_TOKEN;
  const res = await fetch(`https://api.pandascore.co/players/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return undefined;
  return res.json() as Promise<Player>;
}

export default async function JogadorDetalhePage({ params }: { params: { id: string } }) {
  const player = await getPlayer(params.id);
  if (!player) {
    notFound();
  }
  
  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3 text-center">
              <img src={player.image_url ?? 'https://placehold.co/400x400/1e293b/ffffff?text=P'} alt={`Foto de ${player.name}`} className="w-64 h-64 rounded-full mx-auto border-8 border-slate-200 dark:border-slate-800 shadow-lg" />
              <h1 className="mt-6 text-4xl font-extrabold text-slate-900 dark:text-slate-50">{player.name}</h1>
              <h2 className="mt-2 text-xl font-semibold text-sky-500">{player.current_team?.name ?? 'Sem Equipa'}</h2>
              <div className="mt-4 flex justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  {player.role && <span className="flex items-center gap-1.5"><HashtagIcon className="h-4 w-4" /> {player.role}</span>}
                  {player.hometown && <span className="flex items-center gap-1.5"><GlobeAltIcon className="h-4 w-4" /> {player.hometown}</span>}
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold mb-4">Sobre o Jogador</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {player.first_name} {player.last_name} é um jogador profissional de eSports, conhecido pela sua dedicação e talento no cenário competitivo. A sua jornada é uma inspiração para muitos aspirantes a pro-players.
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Conquistas</h3>
                 <p className="text-slate-600 dark:text-slate-300">As estatísticas e conquistas detalhadas serão adicionadas em breve.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-16">
            <Link href="/jogadores" className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline">
              &larr; Ver todos os jogadores
            </Link>
          </div>
        </div>
      </section>
      <ViewTracker documentId={params.id} documentType="player" documentName={player.name} />
    </div>
  );
}