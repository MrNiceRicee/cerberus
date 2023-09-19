import type { InferSelectModel } from 'drizzle-orm';
import { bigint, mysqlTableCreator, varchar, text } from 'drizzle-orm/mysql-core';

const mysqlTable = mysqlTableCreator((name) => `cerberus_${name}`);

export const user = mysqlTable('auth_user', {
  id: varchar('id', {
    length: 15, // change this when using custom user ids
  }).primaryKey(),
  email: varchar('email', {
    length: 255,
  })
    .notNull(),
  display_name: varchar('display_name', {
    length: 255,
  }),
  avatar_url: text('avatar_url'),
  // other user attributes
});

export type User = InferSelectModel<typeof user>;

export const key = mysqlTable('user_key', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  }).notNull(),
  // .references(() => user.id),
  hashedPassword: varchar('hashed_password', {
    length: 255,
  }),
});

export const session = mysqlTable('user_session', {
  id: varchar('id', {
    length: 128,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  }).notNull(),
  // .references(() => user.id),
  activeExpires: bigint('active_expires', {
    mode: 'number',
  }).notNull(),
  idleExpires: bigint('idle_expires', {
    mode: 'number',
  }).notNull(),
});
