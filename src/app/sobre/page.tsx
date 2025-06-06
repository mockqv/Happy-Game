import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function SobrePage() {
  return (
    <div className="w-full">
      {/* Cabeçalho da Página */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <InformationCircleIcon className="h-12 w-12 mx-auto text-sky-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Sobre o Happy Game
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A sua plataforma central para tudo o que importa no universo dos jogos competitivos.
          </p>
        </div>
      </section>

      {/* Conteúdo da Página */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="prose dark:prose-invert prose-lg max-w-4xl mx-auto">
            <h2>Nossa Missão</h2>
            <p>
              No Happy Game, a nossa missão é simples: criar o hub definitivo para fãs de eSports. Acreditamos que todos os jogadores, desde os casuais aos profissionais, merecem uma plataforma que centralize notícias, resultados de competições e informações sobre os seus atletas favoritos. Cansados de procurar em dezenas de sites diferentes, decidimos construir a casa que sempre quisemos.
            </p>
            
            <h2>O Que Fazemos</h2>
            <p>
              Nós agregamos e curamos conteúdo de todo o cenário gamer para lhe trazer informações precisas e atualizadas. A nossa equipa é apaixonada por jogos e dedicada a cobrir todos os aspetos do desporto eletrónico, desde as atualizações de patches que mudam o meta até às histórias inspiradoras por trás dos maiores jogadores.
            </p>
            <ul>
              <li><strong>Notícias em tempo real:</strong> Cobertura dos principais eventos e atualizações.</li>
              <li><strong>Dados de Competições:</strong> Calendários, brackets e resultados de torneios.</li>
              <li><strong>Perfis Detalhados:</strong> Estatísticas e biografias das lendas dos eSports.</li>
            </ul>

            <h2>Junte-se a Nós</h2>
            <p>
              O Happy Game é mais do que um site, é uma comunidade. Convidamo-lo a explorar, a partilhar e a celebrar connosco a paixão pelos jogos. O seu feedback é crucial para continuarmos a evoluir. Obrigado por fazer parte da nossa jornada.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}