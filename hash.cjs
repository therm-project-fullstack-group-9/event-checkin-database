const crypto = require("crypto");
const fs = require("fs");

const sql = fs.readFileSync("./db/migration/0000_robust_chronomancer.sql", "utf8");
const hash = crypto.createHash("sha256").update(sql).digest("hex");

console.log(hash);