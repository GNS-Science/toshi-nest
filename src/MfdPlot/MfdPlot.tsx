import React, { useState } from 'react';
import { Axis, AnimatedLineSeries, Tooltip, XYChart } from '@visx/xychart';
import { FormControlLabel, Menu, Radio, RadioGroup, MenuItem, IconButton, Typography } from '@mui/material';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { RectClipPath } from '@visx/clip-path';
import { Group } from '@visx/group';
import SettingsIcon from '@mui/icons-material/Settings';

import { MfdPlotProps, Datum } from './MfdPlot.types';
export const MfdPlot = ({ data, width, height, xLabel, yLabel, labelProps, xLabelOffset, yLabelOffset, header, lineColours, xScaleDomain, yScaleDomain, legendDomain }: MfdPlotProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [linesToDisplay, setLinesToDisplay] = useState<string>('Incremental');
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setLinesToDisplay(value);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <IconButton
        sx={{ position: 'absolute', right: '5px', top: '5px', zIndex: 10000 }}
        id="positioned-button"
        aria-controls={open ? 'positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        style={{ zIndex: 120001 }}
      >
        <RadioGroup aria-labelledby="radio-buttons-group-label" defaultValue="Incremental" name="radio-buttons-group" onChange={handleRadioChange}>
          <MenuItem>
            <FormControlLabel value="Incremental" control={<Radio />} label="Incremental" />
          </MenuItem>
          <MenuItem>
            <FormControlLabel value="Cumulative" control={<Radio />} label="Cumulative" />
          </MenuItem>
          <MenuItem>
            <FormControlLabel value="Both" control={<Radio />} label="Both" />
          </MenuItem>
        </RadioGroup>
      </Menu>
      <XYChart height={height} width={width} xScale={{ type: 'linear', domain: xScaleDomain, zero: false }} yScale={{ type: 'log', domain: yScaleDomain }}>
        <text y={18} x={'50%'} alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize={'large'} fontWeight="bold" fontFamily={'"Roboto","Helvetica","Arial",sans-serif'}>
          {header}
        </text>
        <Axis numTicks={5} orientation="bottom" label={xLabel} labelProps={labelProps} labelOffset={xLabelOffset} />
        <Axis orientation="left" label={yLabel} labelProps={labelProps} labelOffset={yLabelOffset} />
        <RectClipPath id={'clip'} x={50} y={-50} width={width} height={height} />
        <Group clipPath={'url(#clip)'}>
          {['Incremental', 'Both'].includes(linesToDisplay) && <AnimatedLineSeries dataKey="key" data={data} xAccessor={(d) => d?.bin_center} yAccessor={(d) => d?.rate} stroke={lineColours[0]} />}
          {['Cumulative', 'Both'].includes(linesToDisplay) && (
            <AnimatedLineSeries dataKey="cumulativeKey" data={data} xAccessor={(d) => d?.bin_center} yAccessor={(d) => d?.cumulative_rate} stroke={lineColours[1]} />
          )}
        </Group>
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          style={{ zIndex: 120000, position: 'absolute', backgroundColor: 'white', borderRadius: '4px', borderWidth: '1px', border: '2px solid rgba(0,0,0,0.2)', padding: 2 }}
          renderTooltip={({ tooltipData }) => {
            const datum = tooltipData?.nearestDatum?.datum as Datum;
            return (
              <>
                <Typography>Rate: {datum?.rate?.toExponential(2)}</Typography>
                <Typography>Cumulative Rate: {datum?.cumulative_rate?.toExponential(2)}</Typography>
                <Typography>Magnitude: {datum?.bin_center.toPrecision(2)}</Typography>
              </>
            );
          }}
        />
      </XYChart>
      <LegendOrdinal
        direction="column"
        scale={scaleOrdinal({
          domain: legendDomain,
          range: lineColours,
        })}
        shape="line"
        shapeHeight={width * 0.02}
        style={{
          fontSize: width * 0.03,
          position: 'absolute',
          top: width * 0.1,
          left: width * 0.6,
          display: 'flex',
        }}
        legendLabelProps={{ style: { fontFamily: '"Roboto","Helvetica","Arial",sans-serif' } }}
      />
    </div>
  );
};
export default MfdPlot;
