import { Elysia, t } from 'elysia';

import { ErrorException } from '../ErrorException';
import { privateRoot } from '../root';

export const edit = new Elysia().use(privateRoot).put(
  '/edit',
  async ({ auth, log, session, logRoute, body }) => {
    logRoute('Editing user');
    try {
      const user = await auth.updateUserAttributes(session.user.userId, {
        display_name: body.displayName,
      });

      return {
        displayName: user.displayName,
      };
    } catch (error) {
      log.error(error);
      throw new ErrorException(
        'INTERNAL_SERVER_ERROR',
        'Encountered an error while editing user. Please try again later.',
      );
    }
  },
  {
    body: t.Object(
      {
        displayName: t.Optional(t.String()),
      },
      {
        additionalProperties: false,
      },
    ),
    beforeHandle: ({ body }) => {
      if (Object.keys(body).length === 0) {
        throw new ErrorException(
          'BAD_REQUEST',
          'You must provide at least one field to edit.',
        );
      }
    },
  },
);
