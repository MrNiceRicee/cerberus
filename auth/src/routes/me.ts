import { Elysia } from 'elysia';

import { ErrorException } from '../ErrorException';
import { privateRoot } from '../root';

export const me = new Elysia()
  .use(privateRoot)
  .get('/me', async ({ auth, log, session }) => {
    log.info('Getting user');
    try {
      const user = await auth.getUser(session.user.userId);

      return {
        user: {
          email: user.email,
          displayName: user.displayName,
        },
      };
    } catch (error) {
      log.error(error, 'Encountered an error while getting user');
      throw new ErrorException(
        'Internal Server Error',
        'Encountered an error while getting user. Please try again later.',
      );
    }
  });
