import React from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routing } from './routing.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
          <SnackbarProvider>
               <RouterProvider router={routing} />
          </SnackbarProvider>
     </React.StrictMode>,
);
