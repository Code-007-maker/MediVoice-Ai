import { integer, pgTable, varchar, text, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  credits: integer("credits")
});

export const sessionChartTable = pgTable("session_chart", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar("sessionId", { length: 255 }).notNull(),
  notes: text("notes"),
  SelectedDoctor:json("SelectedDoctor"),
  conversation: json("conversation"),
  report: json("report"),
  createdBy: varchar("created_by", { length: 255 }).references(() => usersTable.email),
  createdOn: varchar("created_on", { length: 255 })
});
