import React, { useState, useEffect } from 'react';

interface AxisLabelProps {
  label: string;
  width: number;
  height: number;
  orientation: 'left' | 'bottom';
}

const AxisLabel: React.FC<AxisLabelProps> = (props: AxisLabelProps) => {
  const { label, height, width, orientation } = props;
  const [labelSize, setLabelSize] = useState<number>(0);

  const yPosition = orientation === 'left' ? 15 : height - 15;
  const xPosition = orientation === 'left' ? -width / 2 : (width - 100) / 2;

  useEffect(() => {
    if (width * 0.022 >= 22) {
      setLabelSize(17);
    } else {
      setLabelSize(width * 0.022);
    }
  }, [width]);

  return (
    <text y={yPosition} x={xPosition} transform={orientation === 'left' ? 'rotate(-90)' : ''} fontSize={labelSize}>
      {label}
    </text>
  );
};

export default AxisLabel;
