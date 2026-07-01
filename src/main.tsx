import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Global error handler to display on screen
window.addEventListener('error', (event) => {
  document.body.innerHTML += `<div style="position:fixed;top:0;left:0;z-index:9999;background:red;color:white;padding:20px;font-family:monospace;width:100%;height:100%;overflow:auto;">
    <h2>Global Error Caught!</h2>
    <p>${event.message}</p>
    <pre>${event.error?.stack}</pre>
  </div>`;
});

window.addEventListener('unhandledrejection', (event) => {
  document.body.innerHTML += `<div style="position:fixed;top:0;left:0;z-index:9999;background:red;color:white;padding:20px;font-family:monospace;width:100%;height:100%;overflow:auto;">
    <h2>Unhandled Promise Rejection!</h2>
    <p>${event.reason}</p>
    <pre>${event.reason?.stack}</pre>
  </div>`;
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
