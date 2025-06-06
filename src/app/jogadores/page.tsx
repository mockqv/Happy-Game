import { UsersIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const players = [
  { id: 1, name: 'Zephyr', team: 'Dragões Alados', role: 'Duelista', country: 'BR', imageUrl: 'https://placehold.co/400x400/1e293b/ffffff?text=Z' },
  { id: 2, name: 'Seraphina', team: 'Fênix Imperial', role: 'Controlador', country: 'PT', imageUrl: 'https://placehold.co/400x400/1e293b/ffffff?text=S' },
  { id: 3, name: 'Kael', team: 'Titãs do Abismo', role: 'Iniciador', country: 'BR', imageUrl: 'https://placehold.co/400x400/1e293b/ffffff?text=K' },
  { id: 4, name: 'Luna', team: 'Sentinelas Cósmicas', role: 'Sentinela', country: 'PT', imageUrl: 'https://placehold.co/400x400/1e293b/ffffff?text=L' },
];

export default function JogadoresPage() {
  return (
    <div className="w-full">
      {/* Cabeçalho da Página */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <UsersIcon className="h-12 w-12 mx-auto text-sky-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Estrelas dos eSports
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Conheça os perfis, estatísticas e carreiras dos melhores jogadores do mundo.
          </p>
        </div>
      </section>

      {/* Grelha de Jogadores */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {players.map((player) => (
              <Link href={`/jogadores/${player.id}`} key={player.id} className="group text-center">
                <div className="relative">
                  <img src={player.imageUrl} alt={`Foto de ${player.name}`} className="w-full rounded-full aspect-square object-cover border-4 border-slate-200 dark:border-slate-800 group-hover:border-sky-500 transition-all duration-300" />
                  <span className="absolute bottom-2 right-2 bg-slate-800 text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center border-2 border-white dark:border-slate-900">{player.country}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-slate-100">{player.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{player.team}</p>
                <p className="mt-1 text-xs font-semibold text-sky-600 dark:text-sky-400">{player.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}