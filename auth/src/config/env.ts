import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number().min(0).max(65535).default(8000),
  DB_HOST: z.string().default('localhost'),
});

export function envInit() {
  const env = envSchema.safeParse(process.env);

  if (!env.success) {
    const error = env.error.flatten().fieldErrors;
    console.error('🤮 Invalid environment variables', error);
    throw new Error(
      `🤮 Invalid environment variables ${JSON.stringify(error)}`,
    );
  }
}
