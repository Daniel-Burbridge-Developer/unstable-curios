import { sql } from 'drizzle-orm';
import {
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `unstable_curios_${name}`);

export const organisation = createTable('organisation', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 1024 }),
  imageUrl: varchar('image_url', { length: 1024 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

export const collection = createTable('collection', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  organisationId: integer('organisation_id').references(() => organisation.id),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 1024 }),
  imageUrl: varchar('image_url', { length: 1024 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

export const subcollection = createTable('subcollection', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  collectionId: integer('collection_id').references(() => collection.id),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 1024 }),
  imageUrl: varchar('image_url', { length: 1024 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

export const item = createTable('item', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  subcollectionId: integer('subcollection_id').references(
    () => subcollection.id
  ),
  name: varchar('name', { length: 256 }).notNull(),
  setNumber: integer('set_number'),
  description: varchar('description', { length: 1024 }),
  imageUrl: varchar('image_url', { length: 1024 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

export const user = createTable('user', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  clerkId: varchar('clerk_id', { length: 256 }).unique().notNull(),
  username: varchar('username', { length: 256 }).unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

export const image = createTable('image', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  url: varchar('url', { length: 1024 }).notNull(),
  status: varchar('status', { length: 256 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

export const userItem = createTable('user_item', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  userId: integer('user_id').references(() => user.id),
  itemId: integer('item_id').references(() => item.id),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

// #### Friendship

// - `id` (UUID, Primary Key)
// - `userId` (UUID, Foreign Key referencing User.id)
// - `friendId` (UUID, Foreign Key referencing User.id)
// - `status` (Enum: 'pending', 'accepted', 'declined')
// - `createdAt` (Timestamp)
// - `updatedAt` (Timestamp)

// #### Trade

// - `id` (UUID, Primary Key)
// - `fromUserId` (UUID, Foreign Key referencing User.id)
// - `toUserId` (UUID, Foreign Key referencing User.id)
// - `offeredCardIds` (JSON array of UUIDs, referencing Card.id)
// - `requestedCardIds` (JSON array of UUIDs, referencing Card.id)
// - `status` (Enum: 'pending', 'accepted', 'declined')
// - `createdAt` (Timestamp)
// - `updatedAt` (Timestamp)

// #### Message (Optional - for future implementation)

// - `id` (UUID, Primary Key)
// - `senderId` (UUID, Foreign Key referencing User.id)
// - `receiverId` (UUID, Foreign Key referencing User.id)
// - `content` (Text)
// - `timestamp` (Timestamp)
// - `createdAt` (Timestamp)
// - `updatedAt` (Timestamp)
