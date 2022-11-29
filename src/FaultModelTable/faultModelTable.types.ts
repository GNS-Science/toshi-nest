export interface FeatureProperties {
  'annual_rate.max': string;
  'annual_rate.min': string;
  'annual_rate.sum': string;
  aseismic_slip_factor: string;
  coupling_coeff: string;
  dip_degree: number;
  dip_dir: number;
  fault_name: string;
  low_depth: number;
  magnitude_count: string;
  'magnitude.max': number;
  'magnitude.min': number;
  parent_id: number;
  parent_name: string;
  rake: number;
  section_index: number;
  sections_index_rk: string;
  slip_rate: number;
  slip_rate_std_dev: number;
  solution_id: string;
  up_depth: number;
}

export interface FaultModelGeojsonFeature {
  id: number;
  type: string;
  properties: FeatureProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geometry: any;
}

export interface RowData {
  id: number;
  name: string;
  maxMag: number;
  minMag: number;
  maxRate: string;
  minRate: string;
  slipRate: number;
}

export interface FaultModelTableProps {
  id: string;
  data: string | null;
}
