import { logger } from '@bogeychan/elysia-logger';
import { HoltLogger } from '@tlscipher/holt';
import { db } from 'core-db';
import { Elysia } from 'elysia';
import { nanoid } from 'nanoid';
import pinoPretty from 'pino-pretty';

import { ErrorException } from './ErrorException';
import { auth as luciaAuth } from './lucia';

const stream = pinoPretty({
  colorize: true,
  ignore: 'pid,hostname',
  translateTime: 'yyyy-mm-dd HH:MM:ss',
});

const errorRoot = new Elysia()
  .error({
    ErrorException,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION':
        set.status = 'Bad Request';

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

const loggerRoot = (app: Elysia) => {
  const requestId = nanoid();

  return app
    .use(
      logger({
        stream,
        msgPrefix: `[${requestId}] `,
      }),
    )
    .use(new HoltLogger({ colorful: true }).getLogger());
};

export const publicRoot = new Elysia()
  .use(loggerRoot)
  .use(errorRoot)
  .decorate('auth', luciaAuth)
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
  .derive(async ({ auth, ...context }) => {
    // waiting for lucia patch to fix
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const authRequest = auth.handleRequest(context);
    const session = await authRequest.validateBearerToken();

    if (!session) {
      context.log.error('Blocked unauthorized request');
      throw new ErrorException('Unauthorized');
    }
    context.log.info('Authorized request');

    return {
      session,
    };
  });
