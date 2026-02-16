import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/fullstack_course_crypto/',
    server: { open: true },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    }
})