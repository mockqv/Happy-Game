"use client"

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { category: "League of Legends", views: 350, fill: "hsl(var(--primary))" },
  { category: "Valorant", views: 300, fill: "hsl(var(--primary) / 0.8)" },
  { category: "CS:GO", views: 200, fill: "hsl(var(--primary) / 0.6)" },
  { category: "Geral", views: 150, fill: "hsl(var(--primary) / 0.4)" },
]

export function CategoriasPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias Populares</CardTitle>
        <CardDescription>Distribuição de visualizações por categoria de jogo.</CardDescription>
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
                dataKey="views"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}