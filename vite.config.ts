import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const env = dotenv.config({ path: __dirname+'/.env' }).parsed;

// https://vite.dev/config/
export default defineConfig({
    define: {
        'process.env.FEED_URL': JSON.stringify(env?.FEED_URL),
        'process.env.ORDER_URL': JSON.stringify(env?.ORDER_URL),
    },
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
