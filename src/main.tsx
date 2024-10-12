import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HookTableExample } from './examples/HookTableExample.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HookTableExample />
  </StrictMode>,
);
