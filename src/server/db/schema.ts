import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkID: text('clerk_id'),
  username: varchar('phone', { length: 256 }),
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

// #### Card

// - `id` (UUID, Primary Key)
// - `collectionId` (UUID, Foreign Key referencing Collection.id)
// - `name` (String)
// - `description` (Text)
// - `imageUrl` (String)
// - `createdAt` (Timestamp)
// - `updatedAt` (Timestamp)

// #### UserCard (Linking Users and Cards)

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
