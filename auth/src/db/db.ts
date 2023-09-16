import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

import { env } from '../config/env';

// create the connection
export const connection = connect({
  url: env.DATABASE_URL,
});

export const db = drizzle(connection);
