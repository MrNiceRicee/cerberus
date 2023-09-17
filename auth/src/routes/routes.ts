import Elysia from 'elysia';

import { register } from './register';

export const routes = new Elysia()
  .group('/auth', (app) => {
    return app.use(register);
  })
  .get('/health', () => {
    return new Response('Online!', {
      status: 200,
    });
  });
