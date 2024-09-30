import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {ThemeProvider} from "styled-components";
import {Theme} from "./style/theme.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={Theme}>
          <App />
      </ThemeProvider>
  </StrictMode>
);
