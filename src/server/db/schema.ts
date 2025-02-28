import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  json,
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
export const createTable = pgTableCreator(
  (name) => `enchanted-library-viewer_${name}`
);

export const user = createTable(
  'user',
  {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    username: varchar('username', { length: 256 }).unique().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (user) => ({
    usernameIndex: index('username_index').on(user.username),
  })
);

export const organization = createTable('organization', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 1024 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

export const collection = createTable('collection', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  organizationId: integer('organization_id').references(() => organization.id),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 1024 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

export const item = createTable('item', {
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

// #### User

// - `id` (UUID, Primary Key)
// - `username` (String, Unique)
// - `email` (String, Unique)
// - `password` (String, Hashed)
// - `createdAt` (Timestamp)
// - `updatedAt` (Timestamp)

// #### Organization

// - `id` (UUID, Primary Key)
// - `name` (String)
// - `description` (Text, Optional)
// - `createdAt` (Timestamp)
// - `updatedAt` (Timestamp)

// #### Collection

// - `id` (UUID, Primary Key)
// - `organizationId` (UUID, Foreign Key referencing Organization.id)
// - `name` (String)
// - `description` (Text, Optional)
// - `createdAt` (Timestamp)
// - `updatedAt` (Timestamp)

// #### Item

// - `id` (UUID, Primary Key)
// - `collectionId` (UUID, Foreign Key referencing Collection.id)
// - `name` (String)
// - `description` (Text)
// - `imageUrl` (String)
// - `createdAt` (Timestamp)
// - `updatedAt` (Timestamp)

// #### UserItem (Linking Users and Cards)

// - `id` (UUID, Primary Key)
// - `userId` (UUID, Foreign Key referencing User.id)
// - `cardId` (UUID, Foreign Key referencing Card.id)
// - `quantity` (Integer)
// - `createdAt` (Timestamp)
// - `updatedAt` (Timestamp)

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
