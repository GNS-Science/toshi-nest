import React from 'react';
import Plot from 'react-plotly.js';
import { data } from './DisaggregationPlotData';

const parsedData = JSON.parse(data);

const DisaggregationPlot: React.FC = () => {
  return (
    <div id="chartholder">
      <Plot data={parsedData.data} layout={parsedData.layout} />
    </div>
  );
};

export default DisaggregationPlot;
