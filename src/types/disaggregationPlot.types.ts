import type { Data, Layout } from 'plotly.js';

export interface DisaggregationPlotProps {
  data: Data[];
  layout: Partial<Layout>;
}
