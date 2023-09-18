import { DatabaseError } from '@planetscale/database';
import { Elysia } from 'elysia';

import { ErrorException } from '../../ErrorException';
import { publicRoot } from '../../root';
import { authModel } from './shared';

export const register = new Elysia()
  .use(publicRoot)
  .use(authModel)
  .post(
    '/register',
    async ({ body, log, auth, logRoute }) => {
      logRoute('Registering user');
      try {
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
        log.error(error);
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
      body: 'register',
      beforeHandle: ({ body }) => {
        if (body.password !== body.confirmPassword) {
          throw new ErrorException('BAD_REQUEST', 'Passwords do not match');
        }
      },
    },
  );
