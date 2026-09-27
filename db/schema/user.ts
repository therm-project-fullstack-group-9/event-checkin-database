import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  boolean,
  date
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("User", {
  UserID: uuid("UserID").primaryKey().defaultRandom().notNull(),
  FirstName: varchar("FirstName", { length: 50 }).notNull(),
  LastName: varchar("LastName", { length: 50 }).notNull(),
  NickName: varchar("NickName", { length: 15}).notNull(),
  BirthDate: date("BirthDate").notNull(),
  Occupation: varchar("Occupation", { length: 40}),
  Workplace: varchar("Workplace", { length: 40}),
  EmailAddress: varchar("EmailAddress", { length: 100}).notNull().unique(),
  Phone: varchar("Phone", { length: 20}).notNull().unique(),
  PasswordHash: varchar("PasswordHash", { length: 60}).notNull(),
  CreatedAt: timestamp("CreatedAt", { mode: "date", precision: 3 }).defaultNow().notNull(),
  UpdatedAt: timestamp("UpdatedAt", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
});