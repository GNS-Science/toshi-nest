import React, { useState, useEffect } from 'react';

interface PlotHeadingsProps {
  heading?: string;
  subHeading?: string;
  width: number;
}

const PlotHeadings: React.FC<PlotHeadingsProps> = ({ heading, subHeading, width }: PlotHeadingsProps) => {
  const [headingSize, setHeadingSize] = useState<number>(0);
  const [subHeadingSize, setSubHeadingSize] = useState<number>(0);

  const headingProps = {
    alignmnetbaseline: 'middle',
    dominantBaseline: 'middle',
    textAnchor: 'middle',
  } as const;

  useEffect(() => {
    width * 0.025 >= 25 ? setHeadingSize(20) : setHeadingSize(width * 0.025);
    width * 0.022 >= 22 ? setSubHeadingSize(17) : setSubHeadingSize(width * 0.022);
  }, [width]);

  return (
    <>
      {heading && (
        <text y={18} x={'50%'} {...headingProps} fontSize={headingSize}>
          {heading}
        </text>
      )}
      {subHeading && (
        <text y={headingSize + 18} x={'50%'} {...headingProps} fontSize={subHeadingSize}>
          {subHeading}
        </text>
      )}
    </>
  );
};

export default PlotHeadings;
