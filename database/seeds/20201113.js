const Knex = require("knex");
const { tableNames } = require("../tableNames");

/**
 * @param {Knex} knex
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex(tableNames.language).del();
  await knex(tableNames.category).del();
  await knex(tableNames.category_description).del();

  await knex(tableNames.language).insert([
    {
      name: "Türkçe",
      code: "tr",
      sort_order: 0,
    },
    {
      name: "English",
      code: "en",
      sort_order: 1,
    },
  ]);

  //main category
  await knex(tableNames.category).insert([
    {
      sort_order: 0,
    },
    {
      sort_order: 1,
    },
  ]);

  //subcategory
  await knex(tableNames.category).insert([
    {
      sort_order: 2,
      parent_id: 1,
    },
    {
      sort_order: 3,
      parent_id: 2,
    },
  ]);

  //subcategory/subcategory
  await knex(tableNames.category).insert([
    {
      sort_order: 4,
      parent_id: 3,
    },
    {
      sort_order: 5,
      parent_id: 4,
    },
  ]);

  await knex(tableNames.category_description).insert([
    {
      name: "Sweatshirt tr",
      meta_title: "Sweatshirt | Oyuncu Giyim",
      meta_description: "Sweatshirt | Oyuncu Giyim",
      meta_keywords: "Sweatshirt | Oyuncu Giyim",
      slug: "/sweatshirt",
      category_id: 1,
      language_id: 1,
    },
    {
      name: "Sweatshirt en",
      meta_title: "Sweatshirt | Oyuncu Giyim",
      meta_description: "Sweatshirt | Oyuncu Giyim",
      meta_keywords: "Sweatshirt | Oyuncu Giyim",
      slug: "/sweatshirt",
      category_id: 1,
      language_id: 2,
    },
    {
      name: "T-shirt tr",
      meta_title: "T-shirt | Oyuncu Giyim",
      meta_description: "T-shirt | Oyuncu Giyim",
      meta_keywords: "T-shirt | Oyuncu Giyim",
      slug: "/t-shirt",
      category_id: 2,
      language_id: 1,
    },
    {
      name: "T-shirt en",
      meta_title: "T-shirt | Oyuncu Giyim",
      meta_description: "T-shirt | Oyuncu Giyim",
      meta_keywords: "T-shirt | Oyuncu Giyim",
      slug: "/t-shirt",
      category_id: 2,
      language_id: 2,
    },
  ]);

  await knex(tableNames.category_description).insert([
    {
      name: "Baskılı Sweatshirt tr",
      meta_title: "Baskılı Sweatshirt",
      meta_description: "Baskılı Sweatshirt | Oyuncu Giyim",
      meta_keywords: "Baskılı Sweatshirt | Oyuncu Giyim",
      slug: "/baskili-sweatshirt",
      category_id: 3,
      language_id: 1,
    },
    {
      name: "Baskılı Sweatshirt en",
      meta_title: "Baskılı Sweatshirt",
      meta_description: "Baskılı Sweatshirt | Oyuncu Giyim",
      meta_keywords: "Baskılı Sweatshirt | Oyuncu Giyim",
      slug: "/baskili-sweatshirt",
      category_id: 3,
      language_id: 2,
    },
    {
      name: "Baskılı T-shirt tr",
      meta_title: "Baskılı T-shirt",
      meta_description: "Baskılı T-shirt | Oyuncu Giyim",
      meta_keywords: "Baskılı T-shirt | Oyuncu Giyim",
      slug: "/baskili-t-shirt",
      category_id: 4,
      language_id: 1,
    },
    {
      name: "Baskılı T-shirt en",
      meta_title: "Baskılı T-shirt",
      meta_description: "Baskılı T-shirt | Oyuncu Giyim",
      meta_keywords: "Baskılı Sweatshirt | Oyuncu Giyim",
      slug: "/baskili-t-shirt",
      category_id: 4,
      language_id: 2,
    },
  ]);
};
