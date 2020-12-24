import knex from "knex";
import knexConfig from "../knexfile";
import { Model } from "objection";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];
let connection = null;

if (!connection) {
  connection = knex({
    ...connectionConfig,
    debug: false,
  });
}

export default Model.knex(connection);
