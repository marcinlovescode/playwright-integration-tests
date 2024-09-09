import { createPool, type Pool } from "mysql2/promise"

const dbConfig = {
      host: "localhost",
      user: "sa",
      password: "sa",
      database: "my_database",
      connectTimeout: 60000
};

export const createDbPool = (): Pool => {
      return createPool(dbConfig);
}
