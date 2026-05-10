import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './categoryScrollFix';
import './categoryViewLightFix';
import './latestSeeAllFix';
import './turkishTextFix';
import './detailSummaryFix';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
