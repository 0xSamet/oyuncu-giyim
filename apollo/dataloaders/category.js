import DataLoader from "dataloader";
//import db from "../../database/connect";
import { Category, CategoryDescription } from "../../database/models/category";
import { tableNames } from "../../database/tableNames";

export function getParentCategories(categories, category, result = []) {
  const parent = categories.find((a) => a.id == category.parent_id);
  if (parent) {
    result.push(parent);
    return getParentCategories(categories, parent, result);
  } else {
    return result;
  }
}

export const parentCategoriesLoader = new DataLoader(async (keys) => {
  const allCategories = await Category.query();

  const parentCategories = {};
  keys.forEach((category) => {
    const c = getParentCategories(allCategories, category);
    parentCategories[category.id] = c;
  });

  return keys.map((category) => {
    return parentCategories[category.id];
  });
});

export const categoriesDescriptionLoader = new DataLoader(async (keys) => {
  const language = keys[0].language;

  let response = {};

  const descriptions = await CategoryDescription.query()
    .select(
      "category_id",
      `${tableNames.category_description}.name`,
      "description",
      "meta_title",
      "meta_description",
      "meta_keywords",
      "slug"
    )
    .joinRelated(tableNames.language)
    .where("code", language);

  descriptions.forEach((description) => {
    response[description.category_id] = description;
  });

  return keys.map((category) => {
    return response[category.id];
  });
});

export const categoriesDescriptionAdminLoader = new DataLoader(async (keys) => {
  let response = {};

  const descriptions = await CategoryDescription.query()
    .select(
      "category_id",
      `${tableNames.category_description}.name`,
      "description",
      "meta_title",
      "meta_description",
      "meta_keywords",
      "slug",
      "code as language"
    )
    .joinRelated(tableNames.language)
    .whereIn(
      "category_id",
      keys.map((category) => category.id)
    );

  keys.forEach((category) => {
    response[category.id] = descriptions.filter((description) => {
      return description.category_id === category.id;
    });
  });

  return keys.map((category) => {
    return response[category.id];
  });
});
