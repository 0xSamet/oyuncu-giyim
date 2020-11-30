const Knex = require("knex");
const { tableNames } = require("../tableNames");

/**
 * @param {Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable(tableNames.desktop_menu, (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("href");
      table.string("target").defaultTo("_self");
      table.string("icon_url");
      table.integer("sort_order");
      table.boolean("is_divider").defaultTo(false);
    })
    .createTable(tableNames.mobile_menu, (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("href");
      table.string("target").defaultTo("_self");
      table.string("icon_url");
      table.integer("sort_order");
    })
    .createTable(tableNames.page, (table) => {
      table.increments();
      table.string("name").notNullable();
      table
        .integer("desktop_menu_id")
        .references("id")
        .inTable(tableNames.desktop_menu)
        .onDelete("cascade");
      table
        .integer("mobile_menu_id")
        .references("id")
        .inTable(tableNames.mobile_menu)
        .onDelete("cascade");
      table.string("meta_title");
      table.string("meta_description", 500);
      table.string("meta_keyword", 500);
      table.string("slug").notNullable();
    })
    .createTable(tableNames.category, (table) => {
      table.increments();
      table.integer("parent_id").references("id").inTable(tableNames.category);
      table.string("name").notNullable();
      table.string("slug").notNullable().unique();
      table.boolean("status").defaultTo(true);
      table.integer("sort_order");
    });
};

/**
 * @param {Knex} knex
 */
exports.down = async function (knex) {
  return await knex.schema
    .dropTable(tableNames.page)
    .dropTable(tableNames.desktop_menu)
    .dropTable(tableNames.mobile_menu)
    .dropTable(tableNames.category);
};
