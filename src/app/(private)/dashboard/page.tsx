"use client"

import { useAuth } from "@/context/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiEye, FiTrendingUp, FiAward, FiUsers, FiFileText, FiCpu } from "react-icons/fi"
import { AcessosSemanaChart } from "@/components/charts/acessos-semana-chart"
import { CategoriasPieChart } from "@/components/charts/categorias-pie-chart"
import { useEffect, useState } from "react"
import { collection, getDocs, Timestamp } from "firebase/firestore"
import { DetalhesCategoriaPage } from "@/components/views/detalhes-categoria-page"
import { AssistenteIAPage } from "@/components/views/assistente-ia-page"
import { db as firebaseDb } from "database/firebase"

const db = process.env.NODE_ENV === 'test' ? {} : firebaseDb;

type CategoryData = { name: string; value: number };
type WeeklyData = { day: string; accesses: number };
interface DashboardMetrics { 
  totalAccess: number;
  engagement: number;
};
type View = 'geral' | 'campeonatos' | 'jogadores' | 'noticias' | 'assistente';

export default function DashboardPage() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('geral');

  useEffect(() => {
    if (metrics) return;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const viewsCollectionRef = collection(db, 'views');
        const viewsSnapshot = await getDocs(viewsCollectionRef);
        
        const totalAccess = viewsSnapshot.size;
        
        const categoryCounts: { [key: string]: number } = {};
        const uniqueDocuments = new Set<string>();

        viewsSnapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.documentType) {
                categoryCounts[data.documentType] = (categoryCounts[data.documentType] || 0) + 1;
            }
            if (data.documentId) {
                uniqueDocuments.add(data.documentId);
            }
        });

        const formattedCategoryData: CategoryData[] = Object.keys(categoryCounts).map(key => ({
            name: key,
            value: categoryCounts[key],
        }));

        const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        const weeklyCounts: { [key: string]: number } = weekDays.reduce((acc, day) => ({...acc, [day]: 0}), {});
        
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        viewsSnapshot.docs.forEach(doc => {
            const viewTimestamp = doc.data().timestamp as Timestamp;
            if (viewTimestamp) {
                const viewDate = viewTimestamp.toDate();
                if (viewDate >= sevenDaysAgo) {
                    const dayName = weekDays[viewDate.getDay()];
                    weeklyCounts[dayName]++;
                }
            }
        });
        const formattedWeeklyData: WeeklyData[] = weekDays.map(day => ({
            day,
            accesses: weeklyCounts[day]
        }));

        const uniqueItemsCount = uniqueDocuments.size;
        const engagement = uniqueItemsCount > 0 ? totalAccess / uniqueItemsCount : 0;

        setMetrics({ totalAccess, engagement });
        setCategoryData(formattedCategoryData);
        setWeeklyData(formattedWeeklyData);

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [metrics]);

  const renderContent = () => {
    switch (currentView) {
      case 'campeonatos':
        return <DetalhesCategoriaPage tipo="tournament" nome="Campeonatos" />;
      case 'jogadores':
        return <DetalhesCategoriaPage tipo="player" nome="Jogadores" />;
      case 'noticias':
        return <DetalhesCategoriaPage tipo="game" nome="Notícias" />;
      case 'assistente':
        return <AssistenteIAPage dashboardData={{ metrics, categoryData, weeklyData }} />;
      case 'geral':
      default:
        return (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Acessos</CardTitle>
                  <FiEye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-2xl font-bold animate-pulse bg-muted rounded w-24 h-8"></div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{metrics?.totalAccess.toLocaleString('pt-BR') || 0}</div>
                      <p className="text-xs text-muted-foreground">Dados em tempo real</p>
                    </>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
                  <FiTrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                   {isLoading ? (
                    <div className="text-2xl font-bold animate-pulse bg-muted rounded w-24 h-8"></div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{metrics?.engagement.toFixed(1) || 0}</div>
                      <p className="text-xs text-muted-foreground">Média de views por item</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AcessosSemanaChart data={weeklyData} />
              <CategoriasPieChart data={categoryData} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex">
      <nav className="w-64 bg-background border-r p-4 space-y-2 sticky top-20 h-[calc(100vh-11rem)]">
        <h2 className="text-lg font-semibold mb-4 px-2">Análises</h2>
        <button onClick={() => setCurrentView('geral')} className={`w-full flex items-center gap-3 p-2 rounded-md text-sm transition-colors ${currentView === 'geral' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
          <FiEye /> Visão Geral
        </button>
        <button onClick={() => setCurrentView('campeonatos')} className={`w-full flex items-center gap-3 p-2 rounded-md text-sm transition-colors ${currentView === 'campeonatos' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
          <FiAward /> Campeonatos
        </button>
        <button onClick={() => setCurrentView('jogadores')} className={`w-full flex items-center gap-3 p-2 rounded-md text-sm transition-colors ${currentView === 'jogadores' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
          <FiUsers /> Jogadores
        </button>
        <button onClick={() => setCurrentView('noticias')} className={`w-full flex items-center gap-3 p-2 rounded-md text-sm transition-colors ${currentView === 'noticias' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
          <FiFileText /> Notícias
        </button>
        <button onClick={() => setCurrentView('assistente')} className={`w-full flex items-center gap-3 p-2 rounded-md text-sm transition-colors ${currentView === 'assistente' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
          <FiCpu /> Assistente IA
        </button>
      </nav>
      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              Olá, <span className="text-primary">{user?.displayName || user?.email}!</span>
            </h1>
            <p className="text-muted-foreground">
              Bem-vindo ao seu painel. Aqui estão as métricas mais recentes do Happy Game.
            </p>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}