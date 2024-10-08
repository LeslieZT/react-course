import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  RouterProvider,
} from 'react-router-dom';
import { router, router2 } from './router/router';
import { routerLazy } from './router/lazy_router';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={routerLazy} />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
