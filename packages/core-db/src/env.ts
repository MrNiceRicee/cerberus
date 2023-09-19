import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
});

function init() {
  const envParse = envSchema.safeParse(process.env);

  if (!envParse.success) {
    const error = envParse.error.flatten().fieldErrors;
    console.error('🤮 Invalid environment variables', error);
    throw new Error(
      `🤮 Invalid environment variables ${JSON.stringify(error)}`,
    );
  }

  return envParse.data;
}

export type Env = z.infer<typeof envSchema>;
export const env = init();
