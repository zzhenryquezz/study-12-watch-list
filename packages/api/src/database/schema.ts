import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const userSchema = sqliteTable('users', {
    id: integer('id').notNull().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique()
});
