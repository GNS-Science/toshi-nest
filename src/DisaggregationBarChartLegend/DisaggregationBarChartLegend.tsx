import React, { useMemo } from 'react';
import { scaleOrdinal } from '@visx/scale';
import { LegendOrdinal, LegendItem, LegendLabel } from '@visx/legend';

export interface DisaggregationBarChartLegendProps {
  colourArray: string[];
  legendGlyphSize: number;
  domain: string[];
  legendTitle: string;
}

export const DisaggregationBarChartLegend = ({ colourArray, legendGlyphSize, domain, legendTitle }: DisaggregationBarChartLegendProps) => {
  const ordinalColorScale = useMemo(
    () =>
      scaleOrdinal<string>({
        domain: domain,
        range: colourArray,
      }),
    [domain, colourArray],
  );

  return (
    <div style={{ margin: '10px' }}>
      <LegendOrdinal scale={ordinalColorScale}>
        {(labels) => (
          <div>
            {legendTitle}:
            {labels.map((label, i) => (
              <LegendItem key={`legend-quantile-${i}`} margin="5px">
                <svg width={legendGlyphSize} height={legendGlyphSize}>
                  <rect fill={colourArray[i]} width={legendGlyphSize} height={legendGlyphSize} />
                </svg>
                <LegendLabel align="left" margin="0 0 0 4px">
                  {label.text}
                </LegendLabel>
              </LegendItem>
            ))}
          </div>
        )}
      </LegendOrdinal>
    </div>
  );
};

export default DisaggregationBarChartLegend;
