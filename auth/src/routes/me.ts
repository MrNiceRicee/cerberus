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
          username: user.username,
        },
      };
    } catch (error) {
      log.error(error);
      throw new ErrorException(
        'INTERNAL_SERVER_ERROR',
        'Encountered an error while getting user. Please try again later.',
      );
    }
  });
