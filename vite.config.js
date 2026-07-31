import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves a project site from /<repo-name>/, so every asset URL
// needs that prefix. Change this if you rename the repo — the built page will
// 404 on its own JS and CSS otherwise.
export default defineConfig({
  base: '/cost-calculator/',
  plugins: [react()],
});
