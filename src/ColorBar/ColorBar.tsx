import React from 'react';
import { scaleLinear, scaleBand } from '@visx/scale';
import { GridColumns, GridRows } from '@visx/grid';
import { Axis, Orientation } from '@visx/axis';
import { Polygon } from '@visx/shape';

export interface ColorBarProps {
  width: number;
  height: number;
  colors: string[];
  tickValues: number[] | string[];
  heading?: string;
  style?: React.CSSProperties;
  vertical?: boolean;
  linear?: boolean;
}

const ColorBar: React.FC<ColorBarProps> = (props: ColorBarProps) => {
  const { width, height, colors, tickValues, heading, style, vertical, linear = true } = props;

  const marginSide = 20;
  const marginTop = 30;
  const marginBottom = 30;
  const xMax = width + marginSide * 2;
  const yMax = height + marginBottom + marginTop;
  const cubeSize = width / colors.length;
  const numberValues = tickValues.map((val) => Number(val));

  const xScale = linear
    ? scaleLinear({
        domain: [Math.min(...numberValues), Math.max(...numberValues)],
        range: [0, width],
      })
    : scaleBand({
        domain: [...tickValues],
        range: [0, width],
      });

  const yScale = scaleLinear({
    domain: [1, 0],
    range: [height, 0],
  });

  const getPoints = (index: number): [number, number][] => {
    return [
      [cubeSize * index, 0],
      [cubeSize * index, height],
      [cubeSize * (index + 1), height],
      [cubeSize * (index + 1), 0],
    ];
  };

  const headingProps = {
    alignmnetbaseline: 'middle',
    dominantBaseline: 'middle',
    textAnchor: 'middle',
  };

  return (
    <div style={style}>
      <svg transform={vertical ? 'rotate(-90 50 100)' : ''} width={xMax} height={yMax}>
        <rect x={0} y={0} width={xMax} height={yMax} fill={'#ffffff'} fillOpacity={0.5} rx={2} />
        {heading && (
          <text y={18} x={'50%'} {...headingProps} fontSize={12} fontFamily={'Helvetica Neue, Arial, Helvetica, sans-serif'}>
            {heading}
          </text>
        )}
        <g transform={`translate(${marginSide}, ${marginTop})`}>
          <GridRows scale={yScale} width={width} height={height} numTicks={1} stroke={'black'} />
          <GridColumns scale={xScale} width={width} height={height} numTicks={3} stroke={'black'} />
          <Axis scale={xScale} top={height} orientation={Orientation.bottom} tickValues={tickValues} tickLineProps={{ fontSize: 10 }} />
          {colors.map((color, index) => {
            return <Polygon key={index} fill={color} points={getPoints(index)} rotate={45} />;
          })}
        </g>
      </svg>
    </div>
  );
};

export default ColorBar;
