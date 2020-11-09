exports.up = function (knex) {
  return knex.schema
    .createTable("menu", (table) => {
      table.increments();
      table.string("text").notNullable();
      table.string("icon").notNullable();
      table.integer("sort_order");
    })
    .createTable("page", (table) => {
      table.increments();
      table.string("text").notNullable();
      table.integer("menu_index").notNullable();
      table.string("meta_title");
      table.string("meta_description");
      table.string("meta_keyword");
      table.string("slug").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("menu").dropTable("page");
};
