import {
  pgTable,
  uuid,
  varchar,
  integer,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

import { UserTable } from "./user.ts";
import { EventTable } from "./event.ts";
import { StatusTypeEnum } from "./event.ts";

export const BookingTable = pgTable("Booking", {
  BookingID: uuid("BookingID").primaryKey().defaultRandom(),
  UserID: uuid("UserID")
    .notNull()
    .references(() => UserTable.UserID),
  EventID: uuid("EventID")
    .notNull()
    .references(() => EventTable.EventID),
  BookingStatus: StatusTypeEnum("Status"),
  BookingDate: timestamp("BookingDate", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  CancelDate: timestamp("CancelDate", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  RegisterDate: timestamp("RegisterDate", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  CreatedAt: timestamp("CreatedAt", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  UpdatedAt: timestamp("UpdatedAt", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
});
