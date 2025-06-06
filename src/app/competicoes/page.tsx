import { TrophyIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const competitions = [
  {
    id: 1,
    name: 'Liga Pro de Verão 2025',
    game: 'Valorant',
    status: 'Ao Vivo',
    prizePool: '100.000 €',
    date: '1 de jun - 30 de jul',
  },
  {
    id: 2,
    name: 'Campeonato Mundial de eSports',
    game: 'League of Legends',
    status: 'Próximo',
    prizePool: '2.000.000 €',
    date: '1 de out - 15 de nov',
  },
  {
    id: 3,
    name: 'Copa de Inverno Invitational',
    game: 'CS:GO',
    status: 'Encerrado',
    prizePool: '50.000 €',
    date: '10 de jan - 25 de fev',
  },
];

const statusStyles: { [key: string]: string } = {
  'Ao Vivo': 'bg-red-500/10 text-red-500 border-red-500/20',
  'Próximo': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'Encerrado': 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

export default function CompeticoesPage() {
  return (
    <div className="w-full">
      {/* Cabeçalho da Página */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <TrophyIcon className="h-12 w-12 mx-auto text-sky-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Competições e Torneios
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Acompanhe a ação, veja os resultados e não perca nenhum momento dos maiores palcos de eSports.
          </p>
        </div>
      </section>

      {/* Lista de Competições */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {competitions.map((comp) => (
              <Link href={`/competicoes/${comp.id}`} key={comp.id} className="block p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:-translate-y-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{comp.name}</h3>
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[comp.status]}`}>
                        {comp.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{comp.game}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-lg font-bold text-sky-600 dark:text-sky-400">{comp.prizePool}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{comp.date}</p>
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