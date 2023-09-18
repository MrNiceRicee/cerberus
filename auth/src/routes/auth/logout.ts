import { Elysia } from 'elysia';

import { privateRoot } from '../../root';

export const logout = new Elysia()
  .use(privateRoot)
  .post('/logout', async ({ auth, log, session, logRoute }) => {
    logRoute('Logging out user');
    try {
      // invalidate session
      await auth.invalidateSession(session?.sessionId);

      return {
        message: 'Successfully logged out',
      };
    } catch (error) {
      log.error(error);
    }
  });
