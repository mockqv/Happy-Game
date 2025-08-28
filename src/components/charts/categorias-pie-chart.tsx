"use client"

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"

type CategoryData = {
  name: string;
  value: number;
};

interface CategoriasPieChartProps {
  data: CategoryData[];
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--primary) / 0.8)",
  "hsl(var(--primary) / 0.6)",
  "hsl(var(--primary) / 0.4)",
];

export function CategoriasPieChart({ data }: CategoriasPieChartProps) {
  // Prepara os dados para o gráfico, traduzindo as chaves se necessário
  const chartData = data.map(item => {
    let translatedName = item.name;
    if (item.name === 'game') translatedName = 'Jogos';
    if (item.name === 'player') translatedName = 'Jogadores';
    if (item.name === 'tournament') translatedName = 'Competições';
    return { ...item, name: translatedName };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias Populares</CardTitle>
        <CardDescription>Distribuição de visualizações por tipo de conteúdo.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
