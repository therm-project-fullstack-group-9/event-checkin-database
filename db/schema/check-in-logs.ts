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
import { UserActivityTable } from "./user-activity.ts";

export const ActionTypeEnum = pgEnum("ActionType", [
  "IN",
  "OUT",
]);

export const CheckInLogsTable = pgTable("CheckInLogs", {
  LogsID: uuid("LogsID").primaryKey().defaultRandom(),
  UserID: uuid("UserID")
    .notNull()
    .references(() => UserTable.UserID),
  ActivityID: uuid("ActivityID")
    .notNull()
    .references(() => UserActivityTable.ActivityID),
  TicketRef: varchar("TicketRef", { length: 50 }).notNull().unique(),
  ActionType: ActionTypeEnum("ActionType").notNull(),
  CreatedAt: timestamp("CreatedAt", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  UpdatedAt: timestamp("UpdatedAt", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date(),
  ),
});
