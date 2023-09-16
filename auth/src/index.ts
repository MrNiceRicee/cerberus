import { Elysia } from 'elysia';

import { env } from './config/env';
import { routes } from './routes/routes';

const app = new Elysia().use(routes).listen(env.PORT ?? 8000);

// eslint-disable-next-line no-console
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
