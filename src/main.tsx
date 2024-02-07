import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Credito from './pages/Credito.tsx'
import Ahorro from './pages/Ahorro.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

import './styles/App.scss'

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

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
