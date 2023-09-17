import { DatabaseError } from '@planetscale/database';
import { Elysia, t } from 'elysia';

import { ErrorException } from '../ErrorException';
import { publicRoot } from '../root';

export const register = new Elysia().use(publicRoot).post(
  '/register',
  async ({ body, auth, log }) => {
    try {
      log.info('Registering user');
      const user = await auth.createUser({
        key: {
          providerId: 'username',
          providerUserId: body.username.toLowerCase(),
          password: body.password,
        },
        attributes: {
          username: body.username,
        },
      });

      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });

      return {
        session,
      };
    } catch (error) {
      if (
        error instanceof DatabaseError &&
        error.message.includes('Duplicate entry')
      ) {
        throw new ErrorException('BAD_REQUEST', 'Username already exists');
      }
      throw new ErrorException(
        'INTERNAL_SERVER_ERROR',
        'Encountered an error while registering user. Please try again later.',
      );
    }
  },
  {
    body: t.Object({
      username: t.String({
        minLength: 1,
      }),
      password: t.String({
        minLength: 8,
      }),
    }),
  },
);
