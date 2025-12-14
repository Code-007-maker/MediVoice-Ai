import { integer, pgTable, varchar, text, json , timestamp } from "drizzle-orm/pg-core";

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


export const doctorAccessTable = pgTable("doctor_access", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  doctorName: varchar("doctor_name", { length: 255 }).notNull(),
  doctorEmail: varchar("doctor_email", { length: 255 }).notNull(),

  patientEmail: varchar("patient_email", { length: 255 }).notNull(),

  otp: varchar("otp", { length: 6 }).notNull(),

  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at").defaultNow()
});

export const doctorNotesTable = pgTable("doctor_notes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  sessionChartId: integer("session_chart_id")
    .references(() => sessionChartTable.id)
    .notNull(),

  doctorName: text("doctor_name").notNull(),
  doctorEmail: text("doctor_email").notNull(),

  note: text("note").notNull(),

  createdAt: timestamp("created_at").defaultNow()
});