import { Elysia } from 'elysia';

import { ErrorException } from './ErrorException';
import { env } from './config/env';
import { routes } from './routes/routes';

new Elysia()
  .use(routes)
  .all('*', ({ set }) => {
    // no need to log this, catch all no route found
    set.status = 501;

    return {
      code: 'NOT_IMPLEMENTED',
      message:
        'Looks like you are trying to access an endpoint that does not exist.',
      status: 501,
    };
  })
  .listen(
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
