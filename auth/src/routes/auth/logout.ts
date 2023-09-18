import { Elysia } from 'elysia';

import { ErrorException } from '../../ErrorException';
import { privateRoot } from '../../root';

export const logout = new Elysia()
  .use(privateRoot)
  .post('/logout', async ({ auth, log, session, logRoute }) => {
    logRoute('Logging out user');
    try {
      // invalidate session
      await auth.invalidateSession(session.sessionId);

      return {
        message: 'Successfully logged out',
      };
    } catch (error) {
      log.error(error);
      throw new ErrorException(
        'INTERNAL_SERVER_ERROR',
        'Encountered an error while logging out. Please try again later.',
      );
    }
  });
