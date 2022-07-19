import { config } from "../config";
import { Pool } from "pg";

export const pool = new Pool({
	user: config.postgresUser,
	host: config.postgresHost,
	database: config.postgresDb,
	password: config.postgresPassword,
	port: config.postgresPort,
});
