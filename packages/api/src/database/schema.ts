import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const files = sqliteTable('files', {
    id: integer('id').notNull().primaryKey(),
    path: text('path').notNull(),
    mimetype: text('mimetype').notNull(),
})

export const medias = sqliteTable('medias', {
    id: integer('id').notNull().primaryKey(),
    name: text('name').notNull(),
    image_id: text('image_id').notNull().references(() => files.id),
    current: integer('current'),
    total: integer('total'),
});

