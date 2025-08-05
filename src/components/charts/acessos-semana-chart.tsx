"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { day: "Segunda", accesses: 1200 },
  { day: "Terça", accesses: 1500 },
  { day: "Quarta", accesses: 1300 },
  { day: "Quinta", accesses: 1800 },
  { day: "Sexta", accesses: 1600 },
  { day: "Sábado", accesses: 2200 },
  { day: "Domingo", accesses: 2100 },
]

export function AcessosSemanaChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acessos na Última Semana</CardTitle>
        <CardDescription>Um resumo das visualizações de página nos últimos 7 dias.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                type="monotone"
                dataKey="accesses"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}