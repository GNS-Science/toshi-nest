import React, { useState } from 'react';

import ControlsBar from '../common/ControlsBar';
import SelectControl from '../common/SelectControl';
import { HazardViewOptions } from '../interfaces/HazardView';

interface HazardViewProps {
  options: HazardViewOptions;
}

const HazardView: React.FC<HazardViewProps> = ({ options }: HazardViewProps) => {
  const [location, setLocation] = useState<string>(options.locations[0]);
  const [PGA, setPGA] = useState<string[]>([options.PGA[0]]);
  const [forecastTime, setForecastTime] = useState<string>(options.forecastTimes[0]);
  const [backgroundSeismicity, setBackgroundSeismicity] = useState<string>(options.backgroundSeismicity[0]);
  const [gmpe, setGmpe] = useState<string>(options.gmpe[0]);
  const [POE, setPOE] = useState<string>('None');

  const [setUHSA, setShowUHSA] = useState<boolean>(false);

  return (
    <>
      <ControlsBar>
        <SelectControl name="Location" options={options.locations} setSelection={setLocation} />
        {/* need multiSelectHere for PGA */}
        <SelectControl name="Forecast Timespan" options={options.forecastTimes} setSelection={setForecastTime} />
        <SelectControl
          name="Background Seismicity"
          options={options.backgroundSeismicity}
          setSelection={setBackgroundSeismicity}
        />
        <SelectControl name="Ground Motion Model" options={options.gmpe} setSelection={setGmpe} />
        <SelectControl name="Probability of Exceedence" options={['None', '2%', '10%']} setSelection={setPOE} />
      </ControlsBar>
    </>
  );
};

export default HazardView;
