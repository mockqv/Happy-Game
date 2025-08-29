import { NextRequest, NextResponse } from 'next/server';
import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'database/firebase';

const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash,
});

export async function POST(req: NextRequest) {
  try {
    const { history, newQuestion } = await req.json();

    if (!newQuestion) {
      return NextResponse.json({ error: 'A pergunta é obrigatória.' }, { status: 400 });
    }

    const querySnapshot = await getDocs(collection(db, "views"));
    const viewsCount: { [key: string]: { nome: string; tipo: any; count: number } } = {};
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const id = data.documentId;
        if (!id) return;
        if (viewsCount[id]) {
          viewsCount[id].count++;
        } else {
          viewsCount[id] = { nome: data.documentName || "N/A", tipo: data.documentType, count: 1 };
        }
    });
    const detailedData = Object.values(viewsCount);

    const prompt = `
        Você é um assistente de IA especialista em análise de dados para o site "Happy Game".
        Sua missão é fornecer insights valiosos. Use o histórico da conversa e os dados atuais para responder.
        Se a pergunta não for sobre jogos ou métricas, recuse educadamente.

        ## DADOS ATUAIS (do Firebase):
        ${JSON.stringify(detailedData)}

        ## Histórico da Conversa:
        ${JSON.stringify(history)}

        ## Nova Pergunta do Usuário:
        "${newQuestion}"
      `;

    const llmResponse = await ai.generate({
      prompt: prompt,
    });

    const response = llmResponse.text;

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Erro na API de chat:", error);
    return NextResponse.json({ error: 'Ocorreu um erro ao processar sua solicitação.' }, { status: 500 });
  }
}