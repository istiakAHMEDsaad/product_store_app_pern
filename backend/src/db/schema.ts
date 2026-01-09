import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// key is got on the code, value save on the database
export const users = pgTable('users', {
  id: text('id').primaryKey(), //clerk id
  email: text('email').notNull().unique(),
  name: text('name'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(), // generate auto for database
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  // cascade -> if a user delete user account all product also delete
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const comments = pgTable('comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

// Relation define how tables connect each other. This enables Drizzle's query API
// to automatically join related data when using `with: {relationName: true}`

// 1️⃣ Users Relations: A user can have many products and many comments
// ⚠️ `many()` means one user can have multiple related records

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
  comments: many(comments),
}));

// 2️⃣ Products Relations: a product belongs to one user and can have many comments
// ⚠️ `one()` means a single related record, `many()` menas multiple related records
export const productsRelations = relations(products, ({ one, many }) => ({
  comments: many(comments),

  // `fields` = the foreign key column in this table (products.userId)
  // `references` = the primary key column in the related table (users.id)
  user: one(users, { fields: [products.userId], references: [users.id] }),
}));

// 3️⃣ Comments Relations: A comment belongs to one user and one product
export const commentsRelations = relations(comments, ({ one }) => ({
  // comment's userId foreign key references user.id primary key
  user: one(users, { fields: [comments.userId], references: [users.id] }),

  // comments productId foreign key references products.id primary key
  products: one(products, {
    fields: [comments.productId],
    references: [products.id],
  }),
}));

// type inferences
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
