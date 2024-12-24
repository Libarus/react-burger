import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@services': path.resolve(__dirname, './src/services'),
            '@pages': path.resolve(__dirname, './src/components/app/pages'),
        },
    },
});
