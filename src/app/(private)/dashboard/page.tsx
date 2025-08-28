"use client"

import { useAuth } from "@/context/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiEye, FiUsers, FiMessageSquare, FiTrendingUp } from "react-icons/fi"
import { AcessosSemanaChart } from "@/components/charts/acessos-semana-chart"
import { CategoriasPieChart } from "@/components/charts/categorias-pie-chart"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "database/firebase"

interface DashboardMetrics {
  totalAccess: number;

}

export default function DashboardPage() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const viewsCollectionRef = collection(db as any, 'views');
        const viewsSnapshot = await getDocs(viewsCollectionRef);
        const totalAccess = viewsSnapshot.size;

        setMetrics({ totalAccess });

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
        // Em caso de erro (ex: no preview), definimos um valor padrão.
        setMetrics({ totalAccess: 0 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Olá, <span className="text-primary">{user?.displayName || user?.email}!</span>
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu painel. Aqui estão as métricas mais recentes do Happy Game.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Acessos</CardTitle>
            <FiEye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-2xl font-bold animate-pulse bg-gray-700 rounded w-24 h-8"></div>
            ) : (
              <>
                <div className="text-2xl font-bold">{metrics?.totalAccess.toLocaleString('pt-BR') || 0}</div>
                <p className="text-xs text-muted-foreground">Dados em tempo real</p>
              </>
            )}
          </CardContent>
        </Card>
        {/* Outros cards continuam com dados estáticos por enquanto */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Usuários</CardTitle>
            <FiUsers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,214</div>
            <p className="text-xs text-muted-foreground">+12.1% desde o mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comentários</CardTitle>
            <FiMessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,933</div>
            <p className="text-xs text-muted-foreground">+8.3% desde a semana passada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
            <FiTrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25.8%</div>
            <p className="text-xs text-muted-foreground">-0.5% desde ontem</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Os gráficos precisarão ser adaptados para receber os dados via props */}
        <AcessosSemanaChart />
        <CategoriasPieChart />
      </div>
    </div>
  )
}