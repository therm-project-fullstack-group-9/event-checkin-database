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
import { EventTable } from "./event.ts";


export const StaffTable = pgTable("Staff", {
  StaffAssignmentID: uuid("StaffAssignmentID").primaryKey().defaultRandom(),
  UserID: uuid("UserID")
    .notNull()
    .references(() => UserTable.UserID),
  EventID: uuid("EventID")
    .notNull()
    .references(() => EventTable.EventID),
  AssignedBy: varchar("AssignedBy", {length: 50}).notNull(),
  CreatedAt: timestamp("CreatedAt", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  UpdatedAt: timestamp("UpdatedAt", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
});
