import { Elysia } from 'elysia';

import { env } from './config/env';
import { routes } from './routes/routes';

new Elysia().use(routes).listen(env.PORT ?? 8000, ({ hostname, port }) => {
  // eslint-disable-next-line no-console
  console.log(`🦊 Elysia is running at ${hostname}:${port}`);
});
