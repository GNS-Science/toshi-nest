export interface MultiSelectProps {
  options: string[];
  selection: string[];
  setSelection: (selections: string[]) => void;
  name: string;
}
