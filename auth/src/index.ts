import { Elysia } from 'elysia';

import { env } from './config/env';
import { routes } from './routes/routes';

new Elysia().use(routes).listen(
  {
    hostname: '0.0.0.0',
    port: env.PORT,
  },
  ({ hostname, port }) => {
    // log the server information
    // eslint-disable-next-line no-console
    console.log(`🦊 Elysia is running at ${hostname}:${port}`);
  },
);
