import { knex, Knex } from "knex";

export abstract class BaseDatabase {
  protected static connection: Knex = knex({
    client: "sqlite3",
    connection: {
      filename: process.env.DB_FILE_PATH as string,
    },
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
      afterCreate: (conn: any, cb: any) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  });

  protected getConnection(): Knex {
    return BaseDatabase.connection;
  }
}

