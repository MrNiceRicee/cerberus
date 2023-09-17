import Elysia from 'elysia';

import { login } from './auth/login';
import { logout } from './auth/logout';
import { register } from './auth/register';
import { me } from './me';

export const routes = new Elysia()
  .group('/auth', (app) => {
    return app.use(register).use(login).use(logout);
  })
  .group('/user', (app) => {
    return app.use(me);
  })
  .get('/health', () => {
    return new Response('Online!', {
      status: 200,
    });
  });
