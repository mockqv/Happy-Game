import { notFound } from 'next/navigation';
import { ClockIcon, UserGroupIcon, TrophyIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const competitions = [
  { id: 1, name: 'Liga Pro de Verão 2025', game: 'Valorant', status: 'Ao Vivo', prizePool: '100.000 €', date: '1 de jun - 30 de jul' },
  { id: 2, name: 'Campeonato Mundial de eSports', game: 'League of Legends', status: 'Próximo', prizePool: '2.000.000 €', date: '1 de out - 15 de nov' },
];
export async function generateStaticParams() {
  return competitions.map((comp) => ({ id: comp.id.toString() }));
}

export default function CompeticaoDetalhePage({ params }: { params: { id: string } }) {
  const competition = competitions.find(c => c.id.toString() === params.id);
  if (!competition) {
    notFound();
  }

  return (
    <div className="w-full">
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <TrophyIcon className="h-12 w-12 mx-auto text-sky-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">{competition.name}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Detalhes, agenda e equipas do maior palco de {competition.game}.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Coluna de Detalhes */}
            <div className="md:col-span-1">
              <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold mb-4">Detalhes do Torneio</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between"><span>Prémio:</span> <span className="font-semibold text-slate-900 dark:text-slate-100">{competition.prizePool}</span></li>
                  <li className="flex justify-between"><span>Datas:</span> <span className="font-semibold">{competition.date}</span></li>
                  <li className="flex justify-between"><span>Jogo:</span> <span className="font-semibold">{competition.game}</span></li>
                  <li className="flex justify-between"><span>Estado:</span> <span className="font-semibold">{competition.status}</span></li>
                </ul>
              </div>
            </div>

            {/* Coluna Principal */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Agenda</h3>
              <p>Agenda de jogos a ser anunciada em breve.</p>
              
              <h3 className="text-2xl font-bold mt-8 mb-4">Equipas Participantes</h3>
              <p>Lista de equipas a ser confirmada.</p>
            </div>
          </div>
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