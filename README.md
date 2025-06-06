# 🎮 Happy Game - Seu Hub Central de eSports

Bem-vindo ao **Happy Game**, uma aplicação web moderna e responsiva construída com Next.js, TypeScript e Tailwind CSS para ser o hub definitivo para fãs de eSports. Centralizamos notícias, resultados de competições e perfis dos seus jogadores favoritos num só lugar.

[![Tech Stack](https://skillicons.dev/icons?i=nextjs,react,tailwind,typescript,nodejs)](https://skillicons.dev)

---

## ✨ Funcionalidades Principais

* **Dados em Tempo Real:** Conectado diretamente às APIs da [RAWG.io](https://rawg.io/apidocs) e [PandaScore](https://pancakes.readme.io/) para fornecer as informações mais recentes sobre jogos, torneios e jogadores profissionais.
* **Navegação Fluida:** Experiência de Single Page Application (SPA) com o App Router do Next.js, permitindo transições instantâneas entre páginas.
* **Páginas de Detalhe Dinâmicas:** Cada jogo, competição e jogador possui uma página de perfil única, gerada automaticamente.
* **Design Moderno e Responsivo:** Construído com Tailwind CSS, o layout adapta-se perfeitamente a qualquer tamanho de ecrã, de telemóveis a desktops.
* **Tema Escuro e Claro:** Um seletor de tema elegante para conforto visual em qualquer ambiente, gerido por `next-themes`.
* **Performance Otimizada:** Utiliza as melhores práticas do Next.js, como Geração de Site Estático (SSG) e Revalidação Incremental (ISR), para um carregamento ultra-rápido e excelente SEO.

---

## 🏗️ Estrutura do Projeto

O projeto utiliza o App Router do Next.js, com uma organização de ficheiros focada na escalabilidade e manutenibilidade.


---

## 🚀 Começando

Para executar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 13.x ou superior)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/mockqv/happy-game.git
    cd happy-game
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Configuração das Variáveis de Ambiente

Para que a aplicação consiga comunicar com as APIs, você precisa das suas chaves de API.

1.  **Crie o ficheiro `.env.local`** na raiz do projeto (copiando de `.env.example`).

2.  **Obtenha as suas chaves:**
    * **RAWG:** Obtenha a sua chave em [rawg.io/apikey](https://rawg.io/apikey).
    * **PandaScore:** Obtenha o seu token no plano gratuito em [pandascore.co](https://pandascore.co).

3.  **Adicione as chaves ao ficheiro `.env.local`:**
    ```env
    RAWG_API_KEY=SUA_CHAVE_DA_RAWG_AQUI
    PANDASCORE_API_TOKEN=SEU_TOKEN_DA_PANDASCORE_AQUI
    ```

### Executar o Projeto

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

2.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

## 📄 Licença

Distribuído sob a Licença MIT. Veja o ficheiro `LICENSE` para mais informações.

---

<p align="center">
  <b>Feito com ❤️ por</b>
</p>
<p align="center">
  <a href="https://github.com/mockqv" title="Perfil do GitHub de mockqv">
    <img 
      src="https://github.com/mockqv.png?size=100" 
      alt="mockqv" 
      width="100" 
      height="100" 
      style="border-radius: 50%;" 
    />
    <br />
    <sub><b>mockqv</b></sub>
  </a>
</p>
