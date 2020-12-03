import knex from "knex";
import knexConfig from "../knexfile";
import { Model } from "objection";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex({
  ...connectionConfig,
  debug: false,
});

Model.knex(connection);

export default connection;
