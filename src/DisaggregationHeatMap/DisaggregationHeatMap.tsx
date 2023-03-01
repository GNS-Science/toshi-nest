import React from 'react';
import { Group } from '@visx/group';
import genBins, { Bin, Bins } from '@visx/mock-data/lib/generators/genBins';
import { scaleLinear } from '@visx/scale';
import { HeatmapRect } from '@visx/heatmap';
import { getSeededRandom } from '@visx/mock-data';
import { AxisBottom, AxisLeft } from '@visx/axis';
import ColorBar from '../ColorBar/ColorBar';

const cool1 = '#122549';
const cool2 = '#b4fbde';

const seededRandom = getSeededRandom(0.41);

const binData = genBins(
  /* length = */ 16,
  /* height = */ 16,
  /** binFunc */ (idx) => 150 * idx,
  /** countFunc */ (i, number) => 25 * (number - i) * seededRandom(),
);

function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.max(...data.map(value));
}

function min<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.min(...data.map(value));
}

// accessors
const bins = (d: Bins) => d.bins;
const count = (d: Bin) => d.count;

const colorMax = max(binData, (d) => max(bins(d), count));
const bucketSizeMax = max(binData, (d) => bins(d).length);

// scales
const xScale = scaleLinear<number>({
  domain: [0, binData.length],
});
const yScale = scaleLinear<number>({
  domain: [0, bucketSizeMax],
});

const rectColorScale = scaleLinear<string>({
  range: [cool1, cool2],
  domain: [0, colorMax],
});
const opacityScale = scaleLinear<number>({
  range: [0.1, 1],
  domain: [0, colorMax],
});

export type HeatmapProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  separation?: number;
  events?: boolean;
  background?: string;
};

const defaultMargin = { top: 10, left: 20, right: 20, bottom: 110 };

const Example = ({ width, height, events = false, margin = defaultMargin, background, separation = 20 }: HeatmapProps) => {
  // bounds
  width = 0.9 * height;
  const size = width > margin.left + margin.right ? width - margin.left - margin.right - separation : width;
  const xMax = size;
  const yMax = height - margin.bottom - margin.top;

  const binWidth = xMax / binData.length;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return width < 10 ? null : (
    <div style={{ display: 'flex' }}>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} rx={14} fill={background} />
        <AxisLeft scale={yScale} top={margin.top + binWidth} left={margin.left + binWidth * 0.75} label="y axis" />
        <AxisBottom scale={xScale} top={yMax + margin.top + binWidth} left={margin.left + binWidth * 0.75} label="x axis" />
        <Group top={margin.top} left={margin.left + separation}>
          <HeatmapRect
            data={binData}
            xScale={(d) => xScale(d) ?? 0}
            yScale={(d) => yScale(d) ?? 0}
            colorScale={rectColorScale}
            opacityScale={opacityScale}
            binWidth={binWidth}
            binHeight={binWidth}
            gap={1}
          >
            {(heatmap) =>
              heatmap.map((heatmapBins) =>
                heatmapBins.map((bin) => (
                  <rect
                    key={`heatmap-rect-${bin.row}-${bin.column}`}
                    className="visx-heatmap-rect"
                    width={bin.width}
                    height={bin.height}
                    x={bin.x}
                    y={bin.y}
                    fill={bin.color}
                    fillOpacity={bin.opacity}
                    onClick={() => {
                      if (!events) return;
                      const { row, column } = bin;
                      alert(JSON.stringify({ row, column, bin: bin.bin }));
                    }}
                  />
                )),
              )
            }
          </HeatmapRect>
        </Group>
      </svg>
      <ColorBar
        width={height / 2}
        height={35}
        colors={['#122549', '#b4fbde']}
        tickValues={[1, 2]}
        heading={'Vs30 = 400m/s, PGA 10% in 50 years'}
        style={{ left: width, top: height / 8, position: 'absolute' }}
        vertical={true}
      />
    </div>
  );
};

export default Example;
