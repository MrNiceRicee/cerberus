import { planetscale } from '@lucia-auth/adapter-mysql';
import { lucia } from 'lucia';
import { elysia } from 'lucia/middleware';

import { env } from './config/env';
import { connection } from './db/db';

export const auth = lucia({
  adapter: planetscale(connection, {
    user: 'cerberus_auth_user',
    key: 'cerberus_user_key',
    session: 'cerberus_user_session',
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
