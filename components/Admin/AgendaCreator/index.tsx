import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from '@material-ui/data-grid';
import { Button } from '@material-ui/core';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'startTime', headerName: 'Start Time', width: 150 },
  { field: 'endTime', headerName: 'End Time', width: 150 },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'presenter', headerName: 'Presenter', width: 250 },
  { field: 'link', headerName: 'Link (if any)', width: 250 },
];

const rows = [
  {
    id: 1,
    startTime: '18:30',
    endTime: '20:30',
    title: 'Test',
    presenter: 'Albert',
    link: '',
  },
];

export const AgendaCreator = () => {
  return (
    <div style={{ height: 400, width: '80%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={50}
        checkboxSelection
        disableSelectionOnClick
      />
      <Button> Add</Button>
    </div>
  );
};
