import knex from "knex";

export default knex({
  client: "pg",
  connection: {
    host: "postgresdb",
    port: 5432,
    user: "postgres",
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});
