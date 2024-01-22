import { knex } from "knex"

export abstract class BaseDatabase{
    protected static connection =  knex({
        client: "sqlite3",
        connection: {
            // filename: "./database.db",
             filename: process.env.DB_FILE_PATH as string,
        },
        useNullAsDefault: true,
        pool: { 
            min: 0,
            max: 1,
            afterCreate: (conn: any, cb: any) => {
                conn.run("PRAGMA foreign_keys = ON", cb)
            }
        }
    });
}
    console.log("conexão com o banco de dados estabelecida com sucesso")
    