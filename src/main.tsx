import React from 'react';
import { createRoot } from 'react-dom/client'; // Corrected import
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Credito from './pages/Credito.tsx';
import Ahorro from './pages/Ahorro.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

import './styles/App.scss';

// Check if the element with ID 'root' exists before rendering
const rootElement = document.querySelector('#root');
if (!rootElement) {
  throw new Error("Element with ID 'root' not found.");
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Credito />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/ahorro',
    element: <Ahorro />,
  }
]);

createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
