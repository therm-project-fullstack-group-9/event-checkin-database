import {
  pgTable,
  uuid,
  varchar,
  integer,
  text,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { UserTable } from "./user.ts";
import { StatusTypeEnum, EventTable } from "./event.ts";

export const RoleTypeEnum = pgEnum("RoleType", [
  "Organizer",
  "Staff",
  "Attendee",
]);

export const UserActivityTable = pgTable("UserActivity", {
  ActivityID: uuid("ActivityID").primaryKey().defaultRandom(),
  UserID: uuid("UserID")
    .notNull()
    .references(() => UserTable.UserID),
  EventID: uuid("EventID")
    .notNull()
    .references(() => EventTable.EventID),
  Role: RoleTypeEnum("Role").notNull(),
  TicketRef: varchar("TicketRef", { length: 50 }).notNull().unique(),
  CheckInTime: timestamp("CheckInTime", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  BookingStatus: StatusTypeEnum("BookingStatus"),

  CreatedAt: timestamp("CreatedAt", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  UpdatedAt: timestamp("UpdatedAt", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
});
