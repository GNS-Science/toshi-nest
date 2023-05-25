import { createContext } from 'react';

const initState = {
  timeIndex: 0,
};

export type TimeDimensionLayerState = typeof initState;

const context = createContext<TimeDimensionLayerState>(initState);

export default context;
