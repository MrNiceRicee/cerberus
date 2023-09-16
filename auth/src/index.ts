import { envInit } from './config/env';
envInit();
import { Elysia } from 'elysia';

import { routes } from './routes/routes';

const app = new Elysia().use(routes).listen(process.env.PORT ?? 8000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
