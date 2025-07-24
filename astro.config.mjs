import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; // si lo usás
import robotsTxt from 'astro-robots-txt'; // si lo usás

export default defineConfig({

  trailingSlash: 'ignore',
  integrations: [tailwind(), robotsTxt()],
  vite: {
    plugins: [
      {
        name: 'redirect-to-default-lang',
        enforce: 'pre',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/') {
              res.statusCode = 302;
              res.setHeader('Location', '/en/');
              res.end();
            } else {
              next();
            }
          });
        },
      },
    ],
  },
});
