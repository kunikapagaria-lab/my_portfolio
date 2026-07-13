import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Mount Sanity Studio at /studio, portfolio everywhere else
if (window.location.pathname.startsWith('/studio')) {
  import('./sanity/StudioApp.jsx').then(({ default: StudioApp }) => {
    createRoot(document.getElementById('root')).render(
      <StrictMode><StudioApp /></StrictMode>
    );
  });
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode><App /></StrictMode>
  );
}
