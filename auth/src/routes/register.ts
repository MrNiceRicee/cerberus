import { Elysia, t } from 'elysia';

import { publicRoot } from '../root';

export const register = new Elysia().use(publicRoot).post(
  '/register',
  ({ body }) => {
    return body;
  },
  {
    body: t.Object({
      username: t.String({
        minLength: 1,
      }),
      password: t.String({
        minLength: 8,
      }),
    }),
  },
);
