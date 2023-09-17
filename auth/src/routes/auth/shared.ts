import { Elysia, t } from 'elysia';

const baseModel = t.Object(
  {
    username: t.String({
      minLength: 1,
    }),
    password: t.String({
      minLength: 8,
    }),
  },
  {
    additionalProperties: false,
  },
);

export const authModel = new Elysia().model({
  baseAuth: baseModel,
  register: t.Composite(
    [
      baseModel,
      t.Object({
        confirmPassword: t.String({
          minLength: 8,
        }),
      }),
    ],
    {
      additionalProperties: false,
    },
  ),
});
