// import { defineConfig } from 'vite';

// export default defineConfig({
//   base: '/resource-coffee-house/',
//   pages: {
//     '/main': {
//       entry: 'index.html'
//     },
//     '/menuPage': {
//       entry: 'menu-page.html'
//     }
//   }
// });
import Inspect from 'vite-plugin-inspect'
import { resolve } from 'path'

export default {
  base: '/resource-coffee-house/',
  plugins: [Inspect()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menuPage: resolve(__dirname, 'menu/menu-page.html')
      }
    }
  }
}