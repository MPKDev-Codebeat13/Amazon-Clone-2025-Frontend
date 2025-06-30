import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ updated import
import App from './App';
import { DataProvider } from './Components/DataProvider/DataProvider';
import './index.css'; // Import your global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
