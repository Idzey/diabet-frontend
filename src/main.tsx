
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/providers/theme-provider.tsx';
import Home from './pages/Home.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Info from './pages/Info.tsx';
import Responsibility from './pages/Responsibility.tsx';
import NotFound from './pages/NotFound.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/permissions/info" element={<Info />} />
          <Route path="/permissions/responsibility" element={<Responsibility />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);