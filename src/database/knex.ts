// knexfile.ts
module.exports = {
    client: "sqlite3",
    connection: {
      filename: "./src/database/labook.db",
    },
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",
    },
  };
  