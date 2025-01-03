import {
	int,
	integer,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable(
	"users",
	{
		id: int().primaryKey({
			autoIncrement: true,
		}),
		name: text().notNull(),
		email: text().notNull().unique(),
		password: text().notNull(),
		rol: text().notNull(),
		createdAt: integer({
			mode: "timestamp",
		}),
		updatedAt: integer({
			mode: "timestamp",
		}),
	},
);
