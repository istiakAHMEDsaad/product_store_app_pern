import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { Relation } from 'drizzle-orm';

export const user = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
});
