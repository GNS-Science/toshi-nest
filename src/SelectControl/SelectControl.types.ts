export interface SelectControlProps {
  options: string[];
  selection: string;
  setSelection: (selection: string) => void;
  name: string;
  tooltip?: string;
}
