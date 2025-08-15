import {
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
	username: text("username").notNull().unique(),
	email: text("email").notNull().unique(),
	hashedPassword: text("hashed_password"),
});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

export const ClassesTable = pgTable("classes", {
	id: text("id").primaryKey(),
	AuthorID: text("Author_id")
		.notNull()
		.references(() => userTable.id),
	classname: text("classname").notNull(),
	description: text("description"),
	code: text("classcode").unique().notNull(),
	coordinates: jsonb().notNull(),
});

export const ClassMembers = pgTable(
	"class_memberships",
	{
		id: text("id").primaryKey(),
		userId: text("user_id").references(() => userTable.id, {
			onDelete: "cascade",
		}),
		code: text("class_id").references(() => ClassesTable.code, {
			onDelete: "cascade",
		}),
		joinedAt: timestamp("joined_at").defaultNow(),
	},
	(table) => ({
		userClassUnique: uniqueIndex("user_class_unique").on(
			table.userId,
			table.code
		), // Unique constraint to prevent duplicate entries
	})
);
