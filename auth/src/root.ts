import { logger } from '@bogeychan/elysia-logger';
import { db } from 'core-db';
import { Elysia } from 'elysia';
import { nanoid } from 'nanoid';
import pinoPretty from 'pino-pretty';

import { ErrorException } from './ErrorException';
import { auth } from './lucia';

const stream = pinoPretty({
  colorize: true,
  ignore: 'pid,hostname',
  translateTime: 'yyyy-mm-dd HH:MM:ss',
});

const errorRoot = new Elysia()
  .addError({
    ErrorException,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION':
        set.status = 400;

        return {
          code: 'Validation_Error',
          message: error.message,
          status: 400,
        };
      case 'ErrorException':
        set.status = error.status;

        return {
          code: error.type,
          message: error.message,
          status: error.status,
          help: error.help,
        };
      default:
        set.status = 500;

        return {
          code: 'Internal_Server_Error',
          message: error.message,
          status: 500,
        };
    }
  });

export const publicRoot = new Elysia()
  .state('requestId', nanoid())
  .use((context) =>
    logger({
      stream,
      msgPrefix: `[${context.store.requestId}] `,
    }),
  )
  .use(errorRoot)
  .decorate('auth', auth)
  .decorate('db', db)
  .derive((context) => {
    return {
      logRoute: (message: string) => {
        context.log.info('%s %s', context.request.method, context.request.url);
        context.log.info(message);
      },
    };
  });

export const privateRoot = new Elysia()
  .use(publicRoot)
  .derive(async (context) => {
    const authRequest = context.auth.handleRequest(context);
    const session = await authRequest.validateBearerToken();
    context.logRoute('Validating session');

    if (!session) {
      context.log.error('Blocked unauthorized request');
      throw new ErrorException('UNAUTHORIZED', 'Unauthorized');
    }

    return {
      session,
    };
  });
