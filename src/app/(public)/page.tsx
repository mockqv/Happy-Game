import { ArrowRightIcon, UsersIcon, NewspaperIcon, TrophyIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// Componente para os Cartões de Destaque, agora com um design mais refinado
const FeatureCard = ({ icon: Icon, title, children, href }: { icon: React.ElementType, title: string, children: React.ReactNode, href: string }) => (
  <Link 
    href={href} 
    className="group relative block p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
  >
    {/* Efeito de brilho no hover */}
    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-sky-500 transition-all duration-300"></div>

    <div className="relative">
      <div className="bg-sky-100 dark:bg-sky-900/50 inline-block p-3 rounded-xl mb-6 border border-sky-200 dark:border-sky-800">
        {/* Ícone com tamanho corrigido */}
        <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4">{children}</p>
      <span className="font-semibold text-sky-600 dark:text-sky-400 flex items-center">
        Saber mais <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  </Link>
);

export default function Home() {
  return (
    <div className="w-full">
      {/* Secção Hero com gradiente de fundo subtil */}
      <section className="relative text-center py-20 md:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-50 mb-4">
            Seu Universo Gamer
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Todas as notícias, competições e perfis de jogadores que você ama, num só lugar. Mergulhe de cabeça no mundo dos eSports.
          </p>
          <Link 
            href="/noticias" 
            className="inline-flex items-center bg-sky-600 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-sky-500/20"
          >
            Explorar Novidades
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Secção de Destaques */}
      <section className="py-20 md:py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Tudo o que Você Precisa</h2>
            <p className="mt-3 text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Explore as nossas principais secções e mantenha-se sempre atualizado.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard title="Últimas Notícias" icon={NewspaperIcon} href="/noticias">
              Fique por dentro das últimas atualizações, patches e eventos do cenário competitivo.
            </FeatureCard>
            <FeatureCard title="Competições" icon={TrophyIcon} href="/competicoes">
              Acompanhe os resultados dos torneios, veja os calendários e torça pelas suas equipas favoritas.
            </FeatureCard>
            <FeatureCard title="Perfis de Jogadores" icon={UsersIcon} href="/jogadores">
              Conheça as estrelas do eSports. Veja estatísticas, biografias e os melhores momentos.
            </FeatureCard>
          </div>
        </div>
      </section>
    </div>
  );
}