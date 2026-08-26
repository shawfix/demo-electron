import './assets/main.css';

import { ThemeProvider } from 'next-themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      themes={['light', 'dark']}
      storageKey="app-theme"
    >
      <App />
    </ThemeProvider>
  </StrictMode>
);
