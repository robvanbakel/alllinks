import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const id = uuid("id").primaryKey().defaultRandom();
const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const UsersTable = pgTable("users", {
  id,
  externalId: text("external_id").unique(),
  displayName: text("display_name"),
  username: text("username").unique(),
  createdAt,
  updatedAt,
});

export const usersRelations = relations(UsersTable, ({ many }) => ({
  links: many(LinksTable),
}));

export const LinksTable = pgTable("links", {
  id,
  userId: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  url: text("url").notNull(),
  createdAt,
  updatedAt,
});

export const linksRelations = relations(LinksTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [LinksTable.userId],
    references: [UsersTable.id],
  }),
}));
