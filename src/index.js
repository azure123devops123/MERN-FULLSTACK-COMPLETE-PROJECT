import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UsersprofileContextProvider } from './context/UsersprofileContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UsersprofileContextProvider>
      <App />
    </UsersprofileContextProvider>
  </React.StrictMode>
);