import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        allowedHosts: [
            'baggiest-interpenetratively-yael.ngrok-free.dev'
        ],
        proxy: {
            '/api': 'http://localhost:5000'
        }
    }
})
