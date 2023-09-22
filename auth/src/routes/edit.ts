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
      log.error(error, 'Encountered an error while editing user');
      throw new ErrorException(
        'Internal Server Error',
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
    beforeHandle: ({ body, log }) => {
      if (Object.keys(body).length === 0) {
        log.error('Bad Request: No fields to edit');
        throw new ErrorException(
          'Bad Request',
          'You must provide at least one field to edit.',
          {
            help: 'The editable field(s) are [displayName].',
          },
        );
      }
    },
  },
);
