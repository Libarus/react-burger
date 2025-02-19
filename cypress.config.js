import { defineConfig } from 'cypress';
import { defineConfig as defineViteConfig } from 'vite';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                async startViteServer(_options) {
                    const vite = await import('vite');
                    return vite.createServer({
                        ...defineViteConfig({
                            plugins: [
                                // ... existing code ...
                            ],
                        }),
                    });
                }
            });
            return config;
        },
        baseUrl: 'http://localhost:5173',
    },
});
