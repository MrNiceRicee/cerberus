import { logger } from '@bogeychan/elysia-logger';
import { Elysia } from 'elysia';
import pretty from 'pino-pretty';

import { db } from './db/db';

const stream = pretty({
  colorize: true,
  ignore: 'pid,hostname',
  translateTime: 'yyyy-mm-dd HH:MM:ss',
});

export const root = new Elysia().use(logger({ stream })).decorate('db', db);
