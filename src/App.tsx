import React from 'react';
import { MantineProvider } from '@mantine/core';
import DataTable from './components/Datatable';

const App: React.FC = () => {
  return (
    <MantineProvider >
      <div className="App">
        <header className="App-header">
          <h1>Agriculture Analytics</h1>
        </header>
        <DataTable />
      </div>
    </MantineProvider>
  );
}

export default App;


