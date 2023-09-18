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
    expires: true,
  },
  sessionExpiresIn: {
    // 5 seconds
    activePeriod: 5 * 1000,
    // 1 day
    idlePeriod: 24 * 60 * 60 * 1000,
  },

  getUserAttributes: (data) => {
    return {
      email: data.email,
      displayName: data.display_name,
    };
  },
});

export type Auth = typeof auth;
