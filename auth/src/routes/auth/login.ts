import { Elysia } from 'elysia';
import { LuciaError } from 'lucia';

import { ErrorException } from '../../ErrorException';
import { publicRoot } from '../../root';
import { authModel } from './shared';

export const login = new Elysia()
  .use(publicRoot)
  .use(authModel)
  .post(
    '/login',
    async ({ body, auth, log, logRoute }) => {
      logRoute('Logging in user');
      try {
        const key = await auth.useKey(
          'email',
          body.email.toLowerCase(),
          body.password,
        );

        const session = await auth.createSession({
          userId: key.userId,
          attributes: {},
        });

        return {
          token: session.sessionId,
          user: session.user,
        };
      } catch (error) {
        log.error(error, 'Error while logging in user');
        if (error instanceof LuciaError) {
          if (
            error.message === 'AUTH_INVALID_KEY_ID' ||
            error.message === 'AUTH_INVALID_PASSWORD'
          ) {
            // user does not exist
            // or invalid password
            throw new ErrorException(
              'Bad Request',
              'Incorrect username or password',
              {
                help: 'Passwords are case sensitive. Check if your caps lock is on.',
              },
            );
          }
        }
        throw new ErrorException(
          'Internal Server Error',
          'Encountered an error while logging in. Please try again later.',
        );
      }
    },
    {
      body: 'baseAuth',
    },
  );
