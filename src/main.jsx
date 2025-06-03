import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { DataProvider } from './Components/DataProvider/DataProvider.jsx';
import { initialState,reducer } from './Utility/reducer.jsx';
import './index.css';
import React from 'react'
createRoot(document.getElementById('root')).render(
  <DataProvider reducer={reducer} initialState={initialState}>
    <App />
  </DataProvider>
);
