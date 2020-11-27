import DataLoader from "dataloader";

function recurseThroughParent(categories, category, result) {
  const parent = categories.find((a) => a.id == category.parent_id);
  if (parent) {
    result.push(parent);
    return recurseThroughParent(categories, parent, result);
  } else {
    return result;
  }
}

export const parentCategoriesLoader = new DataLoader((keys) => {
  const parentCategories = {};
  keys.map((category) => {
    const c = recurseThroughParent(keys, category, []);
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
