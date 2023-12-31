import Elysia from 'elysia';

import { login } from './auth/login';
import { logout } from './auth/logout';
import { logoutAllSessions } from './auth/logoutAllSessions';
import { register } from './auth/register';
import { edit } from './edit';
import { me } from './me';

export const routes = new Elysia()
  .group('/auth', (app) => {
    return app.use(register).use(login).use(logout).use(logoutAllSessions);
  })
  .group('/user', (app) => {
    return app.use(me).use(edit);
  })
  .get('/health', () => {
    return new Response('Online!', {
      status: 200,
    });
  });
