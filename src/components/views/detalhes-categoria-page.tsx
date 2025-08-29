"use client"

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { db } from "database/firebase";

type DetalhesCategoriaPageProps = {
  tipo: 'tournament' | 'player' | 'game';
  nome: string;
};

type ItemData = {
  id: string;
  nome: string;
  visualizacoes: number;
};

export function DetalhesCategoriaPage({ tipo, nome }: DetalhesCategoriaPageProps) {
  const [items, setItems] = useState<ItemData[]>([]);
  const [filtro, setFiltro] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "views"), where("documentType", "==", tipo));
        const querySnapshot = await getDocs(q);

        const viewsCount: { [key: string]: { nome: string; count: number } } = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const id = data.documentId;
          const nomeDoc = data.documentName || "Nome não encontrado";
          if (viewsCount[id]) {
            viewsCount[id].count++;
          } else {
            viewsCount[id] = { nome: nomeDoc, count: 1 };
          }
        });
        
        const aggregatedData: ItemData[] = Object.keys(viewsCount).map(id => ({
          id: id,
          nome: viewsCount[id].nome,
          visualizacoes: viewsCount[id].count
        })).sort((a, b) => b.visualizacoes - a.visualizacoes);

        setItems(aggregatedData);
      } catch (error) {
        console.error(`Erro ao buscar dados de ${nome}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tipo, nome]);

  const itemsFiltrados = items.filter(item =>
    item.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Análise de {nome}</h2>
      
      <div className="space-y-4">
        <Input
          placeholder={`Filtrar ${nome.toLowerCase()} por nome...`}
          value={filtro}
          onChange={(e: any) => setFiltro(e.target.value)}
          className="max-w-sm"
        />
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Conteúdo</TableHead>
                <TableHead className="text-right">Total de Visualizações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={2} className="text-center h-24">Carregando dados...</TableCell></TableRow>
              ) : itemsFiltrados.length > 0 ? (
                itemsFiltrados.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.nome}</TableCell>
                    <TableCell className="text-right">{item.visualizacoes}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={2} className="text-center h-24">Nenhum item encontrado.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}