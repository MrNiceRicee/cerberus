import { planetscale } from '@lucia-auth/adapter-mysql';
import { lucia } from 'lucia';
import { elysia } from 'lucia/middleware';

import { env } from './config/env';
import { connection } from './db/db';

export const auth = lucia({
  adapter: planetscale(connection, {
    user: 'auth_user',
    key: 'user_key',
    session: 'user_session',
  }),
  env: env.NODE_ENV === 'production' ? 'PROD' : 'DEV',

  middleware: elysia(),
  sessionCookie: {
    expires: false,
  },

  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
});

export type Auth = typeof auth;
