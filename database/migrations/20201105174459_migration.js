const Knex = require("knex");
const tableNames = require("../tableNames");

/**
 * @param {Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable(tableNames.language, (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("code").unique();
      table.string("flag_code");
      table.integer("sort_order");
      table.boolean("status").defaultTo(true);
      table.boolean("is_default").defaultTo(false);
    })
    .createTable(tableNames.desktop_menu, (table) => {
      table.increments();
      table.integer("sort_order");
      table.boolean("is_divider").defaultTo(false);
      table.boolean("status").defaultTo(true);
    })
    .createTable(tableNames.desktop_menu_description, (table) => {
      table.increments();
      table
        .integer("desktop_menu_id")
        .references("id")
        .inTable(tableNames.desktop_menu)
        .onDelete("cascade")
        .notNullable();
      table
        .integer("language_id")
        .references("id")
        .inTable(tableNames.language)
        .onDelete("cascade")
        .notNullable();
      table.string("name").notNullable().defaultTo("");
      table.string("href").defaultTo("");
      table.string("target").defaultTo("_self");
      table.string("icon_url").defaultTo("");
    })
    .createTable(tableNames.mobile_menu, (table) => {
      table.increments();
      table.integer("sort_order");
      table.boolean("status").defaultTo(true);
    })
    .createTable(tableNames.mobile_menu_description, (table) => {
      table.increments();
      table
        .integer("mobile_menu_id")
        .references("id")
        .inTable(tableNames.mobile_menu)
        .onDelete("cascade")
        .notNullable();
      table
        .integer("language_id")
        .references("id")
        .inTable(tableNames.language)
        .onDelete("cascade")
        .notNullable();
      table.string("name").notNullable().defaultTo("");
      table.string("href").defaultTo("");
      table.string("target").defaultTo("_self");
      table.string("icon_url").defaultTo("");
    })
    .createTable(tableNames.category, (table) => {
      table.increments();
      table
        .integer("parent_id")
        .references("id")
        .inTable(tableNames.category)
        .onDelete("cascade")
        .defaultTo(null);
      table
        .integer("desktop_menu_id")
        .references("id")
        .inTable(tableNames.desktop_menu)
        .onDelete("cascade")
        .defaultTo(null);
      table
        .integer("mobile_menu_id")
        .references("id")
        .inTable(tableNames.category)
        .onDelete("cascade")
        .defaultTo(null);
      table.integer("sort_order");
      table.boolean("status").defaultTo(true);
    })
    .createTable(tableNames.category_description, (table) => {
      table.increments();
      table
        .integer("category_id")
        .references("id")
        .inTable(tableNames.category)
        .onDelete("cascade")
        .notNullable();
      table
        .integer("language_id")
        .references("id")
        .inTable(tableNames.language)
        .onDelete("cascade")
        .notNullable();
      table.string("name").notNullable().defaultTo("");
      table.text("description").defaultTo("");
      table.string("meta_title").defaultTo("");
      table.string("meta_description", 500).defaultTo("");
      table.string("meta_keywords", 500).defaultTo("");
      table.string("slug").notNullable().defaultTo("");
    })
    .createTable(tableNames.page, (table) => {
      table.increments();
      table
        .integer("desktop_menu_id")
        .references("id")
        .inTable(tableNames.desktop_menu)
        .onDelete("cascade")
        .defaultTo(null);
      table
        .integer("mobile_menu_id")
        .references("id")
        .inTable(tableNames.mobile_menu)
        .onDelete("cascade")
        .defaultTo(null);
      table.integer("sort_order");
      table.boolean("status").defaultTo(true);
    })
    .createTable(tableNames.page_description, (table) => {
      table.increments();
      table
        .integer("page_id")
        .references("id")
        .inTable(tableNames.page)
        .onDelete("cascade")
        .notNullable();
      table
        .integer("language_id")
        .references("id")
        .inTable(tableNames.language)
        .onDelete("cascade")
        .notNullable();
      table.string("name").notNullable().defaultTo("");
      table.text("description").defaultTo("");
      table.string("meta_title").defaultTo("");
      table.string("meta_description", 500).defaultTo("");
      table.string("meta_keywords", 500).defaultTo("");
      table.string("slug").notNullable().defaultTo("");
    })
    .createTable(tableNames.option, (table) => {
      table.increments();
      table.string("type").notNullable();
      table.integer("sort_order");
    })
    .createTable(tableNames.option_description, (table) => {
      table.increments();
      table
        .integer("option_id")
        .references("id")
        .inTable(tableNames.option)
        .onDelete("cascade")
        .notNullable();
      table
        .integer("language_id")
        .references("id")
        .inTable(tableNames.language)
        .onDelete("cascade")
        .notNullable();
      table.string("name").notNullable().defaultTo("");
    })
    .createTable(tableNames.option_value, (table) => {
      table.increments();
      table
        .integer("option_id")
        .references("id")
        .inTable(tableNames.option)
        .onDelete("cascade")
        .notNullable();
      table.integer("sort_order");
    })
    .createTable(tableNames.option_value_description, (table) => {
      table.increments();
      table
        .integer("option_value_id")
        .references("id")
        .inTable(tableNames.option_value)
        .onDelete("cascade")
        .notNullable();
      table
        .integer("language_id")
        .references("id")
        .inTable(tableNames.language)
        .onDelete("cascade")
        .notNullable();
      table.string("name").notNullable().defaultTo("");
    })
    .createTable(tableNames.country, (table) => {
      table.increments();
      table.integer("sort_order");
      table.boolean("status").defaultTo(true);
    })
    .createTable(tableNames.country_description, (table) => {
      table.increments();
      table
        .integer("country_id")
        .references("id")
        .inTable(tableNames.country)
        .onDelete("cascade")
        .notNullable();
      table
        .integer("language_id")
        .references("id")
        .inTable(tableNames.language)
        .onDelete("cascade")
        .notNullable();
      table.string("name").notNullable().defaultTo("");
    })
    .createTable(tableNames.zone, (table) => {
      table.increments();
      table
        .integer("country_id")
        .references("id")
        .inTable(tableNames.country)
        .onDelete("cascade")
        .notNullable();
      table.string("name").notNullable().defaultTo("");
      table.integer("sort_order");
      table.boolean("status").defaultTo(true);
    })
    .createTable(tableNames.geo_zone, (table) => {
      table.increments();
      table.string("name").notNullable().defaultTo("");
      table.text("description").defaultTo("");
      table.integer("sort_order");
    })
    .createTable(tableNames.zone_geo_zone, (table) => {
      table.increments();
      table
        .integer("country_id")
        .references("id")
        .inTable(tableNames.country)
        .onDelete("cascade")
        .notNullable();
      table.integer("zone_id").notNullable();
      table
        .integer("geo_zone_id")
        .references("id")
        .inTable(tableNames.geo_zone)
        .onDelete("cascade")
        .notNullable();
    })
    .createTable(tableNames.tax_rate, (table) => {
      table.increments();
      table
        .integer("geo_zone_id")
        .references("id")
        .inTable(tableNames.geo_zone)
        .onDelete("cascade")
        .notNullable();
      table.string("name").notNullable().defaultTo("");
      table.float("rate").notNullable().defaultTo(0);
      table.string("type").notNullable().defaultTo("P");
      table.integer("sort_order");
    })
    .createTable(tableNames.tax_class, (table) => {
      table.increments();
      table.string("name").notNullable().defaultTo("");
      table.text("description").defaultTo("");
      table.integer("sort_order");
    })
    .createTable(tableNames.tax_rule, (table) => {
      table.increments();
      table
        .integer("tax_class_id")
        .references("id")
        .inTable(tableNames.tax_class)
        .onDelete("cascade")
        .notNullable();
      table
        .integer("tax_rate_id")
        .references("id")
        .inTable(tableNames.tax_rate)
        .onDelete("cascade")
        .notNullable();
      table.integer("priority");
    });
};

/**
 * @param {Knex} knex
 */
exports.down = async function (knex) {
  //clear category
  await knex.schema.dropTableIfExists(tableNames.category_description);
  await knex.schema.dropTableIfExists(tableNames.category);

  //clear page
  await knex.schema.dropTableIfExists(tableNames.page_description);
  await knex.schema.dropTableIfExists(tableNames.page);

  //clear desktop_menu
  await knex.schema.dropTableIfExists(tableNames.desktop_menu_description);
  await knex.schema.dropTableIfExists(tableNames.desktop_menu);

  //clear mobile_menu
  await knex.schema.dropTableIfExists(tableNames.mobile_menu_description);
  await knex.schema.dropTableIfExists(tableNames.mobile_menu);

  //clear options
  await knex.schema.dropTableIfExists(tableNames.option_value_description);
  await knex.schema.dropTableIfExists(tableNames.option_value);
  await knex.schema.dropTableIfExists(tableNames.option_description);
  await knex.schema.dropTableIfExists(tableNames.option);

  //clear country / zone / geo_zone / zone_geo_zone // taxes
  await knex.schema.dropTableIfExists(tableNames.tax_rule);
  await knex.schema.dropTableIfExists(tableNames.tax_class);
  await knex.schema.dropTableIfExists(tableNames.tax_rate);
  await knex.schema.dropTableIfExists(tableNames.zone_geo_zone);
  await knex.schema.dropTableIfExists(tableNames.geo_zone);
  await knex.schema.dropTableIfExists(tableNames.zone);
  await knex.schema.dropTableIfExists(tableNames.country_description);
  await knex.schema.dropTableIfExists(tableNames.country);

  //clear language
  await knex.schema.dropTableIfExists(tableNames.language);
};
