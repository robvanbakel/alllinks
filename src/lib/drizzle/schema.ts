import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const UsersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  externalId: text("external_id"),
  displayName: text("display_name"),
  username: text("username").notNull(),
  createdAt,
  updatedAt,
});

export const LinksTable = pgTable("links", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  url: text("url").notNull(),
  createdAt,
  updatedAt,
});
