import React from 'react';
import { scaleLinear } from '@visx/scale';
import { GridColumns, GridRows } from '@visx/grid';
import { Axis, Orientation } from '@visx/axis';
import { Polygon } from '@visx/shape';

export interface ColorBarProps {
  width: number;
  height: number;
  colors: string[];
  tickValues: number[];
  style?: React.CSSProperties;
}

const ColorBar: React.FC<ColorBarProps> = (props: ColorBarProps) => {
  const { width, height, colors, tickValues, style } = props;

  const margin = 50;
  const xMax = width + margin * 2;
  const yMax = height + margin * 2;
  const cubeSize = width / colors.length;

  const xScale = scaleLinear({
    domain: [Math.min(...tickValues), Math.max(...tickValues)],
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

  return (
    <div style={style}>
      <svg width={xMax} height={yMax}>
        <g transform={`translate(${margin}, ${margin})`}>
          <GridRows scale={yScale} width={width} height={height} numTicks={1} stroke={'black'} />
          <GridColumns scale={xScale} width={width} height={height} numTicks={3} stroke={'black'} />
          <Axis scale={xScale} top={height} orientation={Orientation.bottom} tickValues={tickValues} />
          {colors.map((color, index) => {
            return <Polygon key={index} fill={color} points={getPoints(index)} rotate={45} />;
          })}
        </g>
      </svg>
    </div>
  );
};

export default ColorBar;
