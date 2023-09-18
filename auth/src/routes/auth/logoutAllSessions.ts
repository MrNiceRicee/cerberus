import { Elysia } from 'elysia';

import { privateRoot } from '../../root';

export const logoutAllSessions = new Elysia()
  .use(privateRoot)
  .post('/logout/all', async ({ auth, log, session, logRoute }) => {
    logRoute('Logging out all sessions');
    try {
      // invalidate all sessions
      await auth.invalidateAllUserSessions(session.user.userId);

      return {
        message: 'Successfully logged out all sessions',
      };
    } catch (error) {
      log.error(error);
    }
  });
