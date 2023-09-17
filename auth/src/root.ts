import { logger } from '@bogeychan/elysia-logger';
import { Elysia } from 'elysia';
import pretty from 'pino-pretty';

import { ErrorException } from './ErrorException';
import { db } from './db/db';
import { auth } from './lucia';

const stream = pretty({
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
  .use(logger({ stream }))
  .use(errorRoot)
  .decorate('auth', auth)
  .decorate('db', db)
  .all('*', () => {
    throw new ErrorException(
      'NOT_IMPLEMENTED',
      'Looks like you are trying to access an endpoint that does not exist.',
    );
  });

export const privateRoot = new Elysia()
  .use(publicRoot)
  .on('beforeHandle', async (context) => {
    const authRequest = context.auth.handleRequest(context);
    const session = await authRequest.validateBearerToken();

    if (!session) {
      context.log.error('Unauthorized - No session');
      throw new ErrorException('UNAUTHORIZED', 'Unauthorized');
    }
  });
