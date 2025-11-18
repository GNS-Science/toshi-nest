import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';

import { generateFaultModelTable } from './faultModelTable.service';
import { FaultModelTableProps, RowData } from './faultModelTable.types';

const columns: GridColDef[] = [
  { field: 'id' },
  { field: 'name', headerName: 'Subsection Name', width: 150 },
  { field: 'minMag', headerName: 'Min Magnitude', type: 'number', width: 150 },
  { field: 'maxMag', headerName: 'Max Magnitude', type: 'number', width: 150 },
  { field: 'minRate', headerName: 'Min Annual Rate', type: 'number', width: 150 },
  { field: 'maxRate', headerName: 'Max Annual Rate', type: 'number', width: 150 },
  { field: 'slipRate', headerName: 'Slip Rate', type: 'number', width: 150 },
];

const columnVisibilityModel: GridColumnVisibilityModel = {
  id: false,
};

const FaultModelTable: React.FC<FaultModelTableProps> = ({ id, data }: FaultModelTableProps) => {
  const [rowData, setRowData] = useState<RowData[]>([]);

  const handler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.nativeEvent.stopImmediatePropagation();
    event.nativeEvent.stopPropagation();
  };

  useEffect(() => {
    if (data) {
      const tableData = generateFaultModelTable(data);
      setRowData(tableData);
    }
  }, [data]);

  return (
    <div
      onKeyDown={(e) => {
        handler(e);
      }}
      onKeyUp={(e) => {
        handler(e);
      }}
    >
      <DataGrid
        style={{ height: 400, width: '100%' }}
        rows={rowData}
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        showToolbar
        slotProps={{ toolbar: { csvOptions: { fileName: `${id}_analysis` } } }}
      />
    </div>
  );
};
export default FaultModelTable;
