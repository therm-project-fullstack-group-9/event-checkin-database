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

export const StatusTypeEnum = pgEnum("StatusType", [
  "Pending",
  "Confirmed",
  "Cancelled",
]);

export const EventTable = pgTable("Event", {
  EventID: uuid("EventID").primaryKey().defaultRandom(),
  UserID: uuid("UserID")
    .notNull()
    .references(() => UserTable.UserID),
  EventName: varchar("EventName", { length: 100 }).notNull(),
  Description: text("Description"),
  StartDateAndTime: timestamp("StartDateAndTime", {
    mode: "date",
    precision: 3,
  })
    .defaultNow()
    .notNull(),
  EndDateAndTime: timestamp("EndDateAndTime", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  Capacity: integer("Capacity").notNull(),
  Location: varchar("Location", { length: 200 }),
  EventStatus: StatusTypeEnum("Status").notNull(),

  CreatedAt: timestamp("CreatedAt", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  UpdatedAt: timestamp("UpdatedAt", {
    mode: "date",
    precision: 3,
  }).$onUpdate(() => new Date()),
});
