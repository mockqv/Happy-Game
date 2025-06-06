import { notFound } from 'next/navigation';
import { HashtagIcon, StarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const players = [
  { id: 1, name: 'Zephyr', team: 'Dragões Alados', role: 'Duelista', country: 'BR', imageUrl: 'https://placehold.co/400x400/1e293b/ffffff?text=Z', bio: 'Conhecido pela sua mira impecável e jogadas agressivas, Zephyr é considerado um dos melhores duelistas da sua região, liderando a sua equipa para a vitória em múltiplos campeonatos.' },
  { id: 2, name: 'Seraphina', team: 'Fênix Imperial', role: 'Controlador', country: 'PT', imageUrl: 'https://placehold.co/400x400/1e293b/ffffff?text=S', bio: 'Uma mente estratégica brilhante, Seraphina domina o campo de batalha com o seu uso inteligente de utilitários, controlando o ritmo do jogo como ninguém.' },
];
export async function generateStaticParams() {
  return players.map((player) => ({ id: player.id.toString() }));
}

export default function JogadorDetalhePage({ params }: { params: { id: string } }) {
  const player = players.find(p => p.id.toString() === params.id);
  if (!player) {
    notFound();
  }

  return (
    <div className="w-full">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Coluna do Jogador (Esquerda) */}
            <div className="lg:w-1/3 text-center">
              <img src={player.imageUrl} alt={`Foto de ${player.name}`} className="w-64 h-64 rounded-full mx-auto border-8 border-slate-200 dark:border-slate-800 shadow-lg" />
              <h1 className="mt-6 text-4xl font-extrabold text-slate-900 dark:text-slate-50">{player.name}</h1>
              <h2 className="mt-2 text-xl font-semibold text-sky-500">{player.team}</h2>
              <div className="mt-4 flex justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5"><HashtagIcon className="h-4 w-4" /> {player.role}</span>
                  <span className="flex items-center gap-1.5"><GlobeAltIcon className="h-4 w-4" /> {player.country}</span>
              </div>
            </div>

            {/* Coluna de Informações (Direita) */}
            <div className="lg:w-2/3">
              <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold mb-4">Sobre o Jogador</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{player.bio}</p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Estatísticas da Carreira</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                        <p className="text-3xl font-bold text-sky-500">1.25</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">K/D Ratio</p>
                    </div>
                     <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                        <p className="text-3xl font-bold text-sky-500">58%</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Taxa de Vitórias</p>
                    </div>
                </div>
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
    </div>
  );
}