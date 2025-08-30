import { render } from '@testing-library/react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { BarChart } from 'recharts';

describe('Chart', () => {
  it('renders without crashing', () => {
    const chartConfig = {
      desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))',
      },
    };

    render(
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={[]}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    );
  });
});
