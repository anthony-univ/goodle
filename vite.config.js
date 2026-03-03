import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  server: {
    port: 5050
  },
  build: {
    rollupOptions: {
      external: ['bcrypt', 'mariadb'], // Mark these packages as external
    },
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
};

export default config;

