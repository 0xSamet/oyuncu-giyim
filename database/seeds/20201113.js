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
  await knex(tableNames.desktop_menu).del();
  await knex(tableNames.desktop_menu_description).del();
  await knex(tableNames.mobile_menu).del();
  await knex(tableNames.mobile_menu_description).del();

  await knex(tableNames.language).insert([
    {
      name: "Türkçe",
      code: "tr",
      flag_code: "tr",
      sort_order: 0,
      is_default: true,
    },
    {
      name: "English",
      code: "en",
      flag_code: "uk",
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

  await knex(tableNames.category_description).insert([
    {
      name: "Sweatshirt tr",
      meta_title: "Sweatshirt | Oyuncu Giyim",
      meta_description: "Sweatshirt | Oyuncu Giyim",
      meta_keywords: "Sweatshirt | Oyuncu Giyim",
      slug: "sweatshirt",
      category_id: 1,
      language_id: 1,
    },
    {
      name: "Sweatshirt en",
      meta_title: "Sweatshirt | Oyuncu Giyim",
      meta_description: "Sweatshirt | Oyuncu Giyim",
      meta_keywords: "Sweatshirt | Oyuncu Giyim",
      slug: "sweatshirt",
      category_id: 1,
      language_id: 2,
    },
    {
      name: "T-shirt tr",
      meta_title: "T-shirt | Oyuncu Giyim",
      meta_description: "T-shirt | Oyuncu Giyim",
      meta_keywords: "T-shirt | Oyuncu Giyim",
      slug: "t-shirt",
      category_id: 2,
      language_id: 1,
    },
    {
      name: "T-shirt en",
      meta_title: "T-shirt | Oyuncu Giyim",
      meta_description: "T-shirt | Oyuncu Giyim",
      meta_keywords: "T-shirt | Oyuncu Giyim",
      slug: "t-shirt",
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
      slug: "baskili-sweatshirt",
      category_id: 3,
      language_id: 1,
    },
    {
      name: "Baskılı Sweatshirt en",
      meta_title: "Baskılı Sweatshirt",
      meta_description: "Baskılı Sweatshirt | Oyuncu Giyim",
      meta_keywords: "Baskılı Sweatshirt | Oyuncu Giyim",
      slug: "baskili-sweatshirt",
      category_id: 3,
      language_id: 2,
    },
    {
      name: "Baskılı T-shirt tr",
      meta_title: "Baskılı T-shirt",
      meta_description: "Baskılı T-shirt | Oyuncu Giyim",
      meta_keywords: "Baskılı T-shirt | Oyuncu Giyim",
      slug: "baskili-t-shirt",
      category_id: 4,
      language_id: 1,
    },
    {
      name: "Baskılı T-shirt en",
      meta_title: "Baskılı T-shirt",
      meta_description: "Baskılı T-shirt | Oyuncu Giyim",
      meta_keywords: "Baskılı Sweatshirt | Oyuncu Giyim",
      slug: "baskili-t-shirt",
      category_id: 4,
      language_id: 2,
    },
  ]);

  await knex(tableNames.desktop_menu).insert([
    {
      sort_order: 0,
      is_divider: false,
    },
    {
      sort_order: 1,
      is_divider: false,
    },
    {
      sort_order: 2,
      is_divider: false,
    },
  ]);

  await knex(tableNames.desktop_menu_description).insert([
    {
      desktop_menu_id: 1,
      language_id: 1,
      name: "Anasayfa",
      href: "/",
      icon_url: "/static/icons/home.svg",
    },
    {
      desktop_menu_id: 1,
      language_id: 2,
      name: "Homepage",
      href: "/",
      icon_url: "/static/icons/home.svg",
    },
    {
      desktop_menu_id: 2,
      language_id: 1,
      name: "Sweatshirt",
      href: "/sweatshirt",
      icon_url: "/static/icons/sweat.svg",
    },
    {
      desktop_menu_id: 2,
      language_id: 2,
      name: "Sweatshirt",
      href: "/sweatshirt",
      icon_url: "/static/icons/sweat.svg",
    },
    {
      desktop_menu_id: 3,
      language_id: 1,
      name: "İletişim",
      href: "/iletisim",
      icon_url: "/static/icons/paper-plane.svg",
    },
    {
      desktop_menu_id: 3,
      language_id: 2,
      name: "Contact",
      href: "/contact",
      icon_url: "/static/icons/paper-plane.svg",
    },
  ]);

  await knex(tableNames.mobile_menu).insert([
    {
      sort_order: 0,
    },
    {
      sort_order: 1,
    },
    {
      sort_order: 2,
    },
    {
      sort_order: 3,
    },
    {
      sort_order: 4,
    },
  ]);

  await knex(tableNames.mobile_menu_description).insert([
    {
      mobile_menu_id: 1,
      language_id: 1,
      name: "Anasayfa",
      href: "/",
      icon_url: "/static/icons/home.svg",
    },
    {
      mobile_menu_id: 1,
      language_id: 2,
      name: "Homepage",
      href: "/",
      icon_url: "/static/icons/home.svg",
    },
    {
      mobile_menu_id: 2,
      language_id: 1,
      name: "Kategoriler",
      href: "/kategoriler",
      icon_url: "/static/icons/categories.svg",
    },
    {
      mobile_menu_id: 2,
      language_id: 2,
      name: "Categories",
      href: "/categories",
      icon_url: "/static/icons/categories.svg",
    },
    {
      mobile_menu_id: 3,
      language_id: 1,
      name: "Giriş Yap",
      href: "/giris-yap",
      icon_url: "/static/icons/profile2.svg",
    },
    {
      mobile_menu_id: 3,
      language_id: 2,
      name: "Log in",
      href: "/log-in",
      icon_url: "/static/icons/profile2.svg",
    },
    {
      mobile_menu_id: 4,
      language_id: 1,
      name: "İletişim",
      href: "/iletisim",
      icon_url: "/static/icons/paper-plane.svg",
    },
    {
      mobile_menu_id: 4,
      language_id: 2,
      name: "Contact",
      href: "/contact",
      icon_url: "/static/icons/paper-plane.svg",
    },
    {
      mobile_menu_id: 5,
      language_id: 1,
      name: "Sepet",
      href: "/sepetim",
      icon_url: "/static/icons/cart.svg",
    },
    {
      mobile_menu_id: 5,
      language_id: 2,
      name: "Cart",
      href: "/cart",
      icon_url: "/static/icons/cart.svg",
    },
  ]);

  await knex(tableNames.page).insert([
    {
      sort_order: 0,
    },
  ]);

  await knex(tableNames.page_description).insert([
    {
      page_id: 1,
      language_id: 1,
      name: "Anasayfa",
      description: "Anaysayfa Açıklama",
      meta_title: "Anaysayfa | Oyuncu Giyim",
      meta_description: "Anaysayfa meta desc",
      meta_keywords: "Anaysayfa meta keywords",
      slug: "/",
    },
    {
      page_id: 1,
      language_id: 2,
      name: "Homepage",
      description: "Homepage Description",
      meta_title: "Homepage | Oyuncu Giyim",
      meta_description: "Homepage meta desc",
      meta_keywords: "Homepage meta keywords",
      slug: "/",
    },
  ]);

  await knex(tableNames.country).insert([
    {
      sort_order: 0,
    },
  ]);

  await knex(tableNames.country_description).insert([
    {
      country_id: 1,
      language_id: 1,
      name: "Türkiye",
    },
    {
      country_id: 1,
      language_id: 2,
      name: "Turkey",
    },
  ]);

  await knex(tableNames.zone).insert([
    {
      country_id: 1,
      name: "İstanbul",
      sort_order: 0,
    },
    {
      country_id: 1,
      name: "Sivas",
      sort_order: 1,
    },
    {
      country_id: 1,
      name: "Sakarya",
      sort_order: 2,
    },
  ]);
};
