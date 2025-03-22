import {
  user,
  image,
  item,
  subcollection,
  collection,
  organisation,
  userItem,
} from '@/server/db/schema';

export type DBUser = typeof user.$inferSelect;

export type DBImage = typeof image.$inferSelect;
export type DBItem = typeof item.$inferSelect;
export type DBSubcollection = typeof subcollection.$inferSelect;
export type DBCollection = typeof collection.$inferSelect;
export type DBOrganisation = typeof organisation.$inferSelect;

export type DBUserItem = typeof userItem.$inferSelect;
