import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { UserProvider } from './contexts/UserContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
