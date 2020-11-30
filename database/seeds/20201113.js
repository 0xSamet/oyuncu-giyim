const Knex = require("knex");
const { tableNames } = require("../tableNames");

/**
 * @param {Knex} knex
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex(tableNames.page).del();
  await knex(tableNames.desktop_menu).del();
  await knex(tableNames.mobile_menu).del();
  await knex(tableNames.category).del();

  await knex(tableNames.desktop_menu).insert([
    {
      name: "Anasayfa",
      href: "/",
      icon_url: "/icons/home.svg",
      sort_order: 1,
    },
    {
      name: "Sweatshirt",
      href: "/sweatshirt",
      icon_url: "/icons/sweat.svg",
      sort_order: 2,
    },
    {
      name: "T-shirt",
      href: "/t-shirt",
      icon_url: "/icons/tshirt.svg",
      sort_order: 3,
    },
    {
      name: "İletişim",
      href: "/iletisim",
      icon_url: "/icons/paper-plane.svg",
      sort_order: 3,
    },
    {
      name: "Divider 1",
      is_divider: true,
      sort_order: 4,
    },
    {
      name: "İnstagram",
      href: "https://instagram.com",
      target: "_blank",
      icon_url: "/icons/instagram.svg",
      sort_order: 5,
    },
    {
      name: "Whatsapp",
      href: "https://whatsapp.com",
      target: "_blank",
      icon_url: "/icons/whatsapp.svg",
      sort_order: 6,
    },
  ]);

  await knex(tableNames.mobile_menu).insert([
    {
      name: "Anasayfa",
      href: "/",
      icon_url: "/icons/home.svg",
      sort_order: 1,
    },
    {
      name: "Kategoriler",
      href: "/kategoriler",
      icon_url: "/icons/categories.svg",
      sort_order: 2,
    },
    {
      name: "Giriş Yap",
      href: "/giris-yap",
      icon_url: "/icons/profile2.svg",
      sort_order: 3,
    },
    {
      name: "Sepet",
      href: "/sepetim",
      icon_url: "/icons/cart.svg",
      sort_order: 4,
    },
    {
      name: "İletişim",
      href: "/iletisim",
      icon_url: "/icons/paper-plane.svg",
      sort_order: 5,
    },
  ]);

  await knex(tableNames.page).insert([
    {
      name: "Anasayfa",
      desktop_menu_id: 1,
      mobile_menu_id: null,
      meta_title: "Anasayfa | Oyuncu Giyim",
      meta_description: "Oyuncu Giyim Anasayfa",
      meta_keyword: "sweatshirt, valorant sweat",
      slug: "/",
    },
    {
      name: "Sweatshirt",
      desktop_menu_id: 2,
      mobile_menu_id: null,
      meta_title: "Sweatshirt | Oyuncu Giyim",
      meta_description: "Oyuncu Giyim SweatShirt",
      meta_keyword: "sweatshirt, valorant sweat",
      slug: "/sweatshirt",
    },
    {
      name: "T-shirt",
      desktop_menu_id: 3,
      mobile_menu_id: null,
      meta_title: "T-shirt | Oyuncu Giyim",
      meta_description: "Oyuncu Giyim T-shirt",
      meta_keyword: "sweatshirt, valorant sweat",
      slug: "/t-shirt",
    },
    {
      name: "İletişim",
      desktop_menu_id: 4,
      mobile_menu_id: null,
      meta_title: "İletişim | Oyuncu Giyim",
      meta_description: "Oyuncu Giyim İletişim",
      meta_keyword: "sweatshirt, valorant sweat",
      slug: "/iletisim",
    },
  ]);

  await knex(tableNames.category).insert([
    {
      name: "Sweatshirt",
      sort_order: 1,
      slug: "/sweatshirt",
    },
    {
      name: "T-shirt",
      sort_order: 2,
      slug: "/t-shirt",
    },
  ]);
  await knex(tableNames.category).insert([
    {
      name: "Baskılı SweatShirt",
      parent_id: 1,
      sort_order: 3,
      slug: "/baskili-sweatshirt",
    },
    {
      name: "Baskılı T-shirt",
      parent_id: 2,
      sort_order: 4,
      slug: "/baskili-t-shirt",
    },
  ]);
};
