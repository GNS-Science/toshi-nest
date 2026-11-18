import React from 'react';
import Plot from 'react-plotly.js';
import type { DisaggregationPlotProps } from '../types/disaggregationPlot.types';

const DisaggregationPlot: React.FC<DisaggregationPlotProps> = (props: DisaggregationPlotProps) => {
  return (
    <div id="chartholder">
      <Plot data={props.data} layout={props.layout} />
    </div>
  );
};

export default DisaggregationPlot;
