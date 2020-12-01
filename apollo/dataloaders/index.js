import DataLoader from "dataloader";
//import db from "../../database/connect";
import { Category } from "../../database/models/category";

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
