"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
const knex_1 = require("knex");
class BaseDatabase {
    getConnection() {
        return BaseDatabase.connection;
    }
}
exports.BaseDatabase = BaseDatabase;
BaseDatabase.connection = (0, knex_1.knex)({
    client: "sqlite3",
    connection: {
        filename: process.env.DB_FILE_PATH,
    },
    useNullAsDefault: true,
    pool: {
        min: 0,
        max: 1,
        afterCreate: (conn, cb) => {
            conn.run("PRAGMA foreign_keys = ON", cb);
        },
    },
});
