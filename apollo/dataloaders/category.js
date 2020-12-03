import DataLoader from "dataloader";
//import db from "../../database/connect";
import { Category, CategoryDescription } from "../../database/models/category";

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

  return new Promise((r, j) => {
    return r(
      keys.map((category) => {
        return parentCategories[category.id];
      })
    );
  });
});

export const categoriesDescriptionLoader = new DataLoader(async (keys) => {
  //console.log("keys", keys[0].language);

  const language = keys[0].language;

  let response = {};

  const descriptions = await CategoryDescription.query()
    .select(
      "category_id",
      "category_description.name",
      "description",
      "meta_title",
      "meta_description",
      "meta_keywords",
      "slug"
    )
    .joinRelated("language")
    .where("code", language);

  descriptions.forEach((description) => {
    response[description.category_id] = description;
  });

  return keys.map((category) => {
    return response[category.id];
  });
});
