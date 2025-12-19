import { Pool } from "pg";

const pool = new Pool({
  user: "kishlaysingh",
  host: "localhost",
  database: "kothiagent_db",
  password: "", // put password if postgres has one
  port: 5432,
});

export default pool;
