import { Elysia, t } from 'elysia';

const baseModel = t.Object(
  {
    email: t.String({
      // minLength: 1,
      format: 'email',
      default: '',
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
        displayName: t.Optional(
          t.String({
            minLength: 1,
          }),
        ),
      }),
    ],
    {
      additionalProperties: false,
    },
  ),
});
