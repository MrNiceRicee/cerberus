import { Elysia } from 'elysia';

import { root } from './root';

const app = new Elysia()
  .use(root)
  .get('/', () => {
    const message = 'Hello, Elysia!';

    return message;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
