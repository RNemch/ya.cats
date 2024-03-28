import { PluginOption, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'node:path'
import { buildSync } from 'esbuild'
dotenv.config({ path: '../../.env' })

const SWPluginOptions: PluginOption = {
  name: 'build-sw',
  apply: 'build',
  enforce: 'post',
  transformIndexHtml() {
    buildSync({
      minify: true,
      bundle: true,
      entryPoints: [path.join(process.cwd(), './src/services/sw.service.ts')],
      outfile: path.join(process.cwd(), 'dist', 'client/sw.js'),
    })
  },
}

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    'process.env.API_URL': JSON.stringify(process.env.API_URL),
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  build: {
    outDir: path.join(__dirname, 'dist/client'),
    rollupOptions: {
      output: {
        format: 'cjs',
      },
    },
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@core': path.resolve(__dirname, './src/core'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@style': path.resolve(__dirname, './src/style'),
      '@controllers': path.resolve(__dirname, './src/controllers'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@mechanics': path.resolve(__dirname, './src/mechanics'),
      '@store': path.resolve(__dirname, './src/store'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@routes': path.resolve(__dirname, './src/routes'),
    },
  },
  plugins: [react(), SWPluginOptions],
})
