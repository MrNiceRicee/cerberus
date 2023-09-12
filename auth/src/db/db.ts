import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

console.log(Bun.env);
// create the connection
const connection = connect({
  host: Bun.env.DATABASE_HOST,
  username: Bun.env.DATABASE_USERNAME,
  password: Bun.env.DATABASE_PASSWORD,
  // url: process.env.DATABASE_URL,
});

export const db = drizzle(connection);
